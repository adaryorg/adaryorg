---
draft: false
date: 2025-07-09
tags:
  - linux
  - tls
  - certificates
  - article
---
# [[how-to-self-sign-certificates-on-linux-and-not-suffer]]
The ways of python, requests library and self signed certificates are definitely mysterious, and without some deep digging can't really be explained. Not to mention that the same library behaves in a completely different way on Mac, and causes a lot of grief when developing on Mac, and then moving everything to linux for testing or production ...

## Scenario
So let's start with this scenario. I have a RESTful application written in golang, that listens on TLS port 8443 (for the sake of this example) and serves a bunch of API endpoints. Those endpoints need to be accessed from a remote host, and by design all the communication needs to be TLS1.3 encrypted.
My development platform for everything is Mac. I wrote the golang app on Mac, I wrote the python app on Mac, and when I tested everything on Mac, it seemed fine. When i moved the golang app to a Linux server, and tried to access it via the python app from another server, I just couldn't get anything to authenticate properly, and I got a bunch of TLS errors.

## Breakdown
So lets break this down. First of all, this is how the certificates were created:
```bash
# generate an RSA key
openssl genrsa -out server.key 4096 

# generate an intermediate CA certificate
# use the actual domain for your server the way you would access it
openssl req -new -x509 -days 365 -key server.key -subj "/C=US/ST=NY/L=New York/O=Company Inc. /CN=Product name /CN=server.domain.com" -out server_ca.crt

# generate a csr (not really necessary but i like to do it)
# use the actual domain for your server the way you would access it
openssl req -newkey rsa:4096 -nodes -keyout server1_server.key -subj "/C=US/ST=NY/L=New York/O=Company Inc./CN=server.domain.com" -out server1_server.csr

# generate a server certificate
# the IP address in subjectAltName should be the external IP address of your
# server so that the certificate would work for both https://server.domain.com
# and https://10.0.0.1 (not the actual server IP address of course)
openssl x509 -req -extfile <(printf "subjectAltName=IP:10.0.0.1") -days 365 -in server1_server.csr -CA server_ca.crt -CAkey server.key -CAcreateserial -out server1_server.crt
```

And here comes the tricky part. When working on Mac, it was more than enough to use the server1_server.crt in the requests part to authenticate the server that was using the same certificate

```python
import requests

print(requests.get('https://server.domain.com:8443/api/v1/endpoint',
                    verify='server1_server.crt'))
```

And when all of this got moved to Linux, it of course didn't work:
```bash
--- SSL ERROR ---
An SSL error occurred. This often happens due to a mismatch between client/server certificates.
Details: HTTPSConnectionPool(host='10.0.0.1', port=8443): Max retries exceeded with url: /api/v1/endpoint (Caused by SSLError(SSLCertVerificationError(1, '[SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1147)')))
```

## Debugging process (aka waste of time)
At first I thought that the issue was that on Mac i work with a newer Python version (3.13) versus 3.9 on the older Linux host, but this had nothing to do with the issue. 
I thought there was a mismatch with system trust bundles, but I never touched those on the Mac, nor did I mess with anything on the Linux side, and of course, regardless of how much I searched around, I never found a single authoritative explanation of what was going on, except various suggestions to do stuff that never worked.

So what did work in the end? Instead of just providing the server certificate for authentication I had to create a bundle that included my self signed CA certificate, and the server certificate:

```bash
cat server_ca.crt > bundle.pem && cat server1_server.crt >> bundle.pem
```

When I provided that bundle to the requests line, it magically started working:

```bash
python3.9 test_requests.py
Attempting to call API endpoint: https://10.0.0.1:8443/api/v1/endpoint

Sending request...

--- SUCCESS ---
Status Code: 200
Response JSON:
<redacted>
```

## Conclusion
Not much of a conclusion for this one except that we shouldn't take the similarities between systems for granted. Self signed certificates are technically very easy, but it's also easy to get something wrong and spend hours debugging it ...