---
draft: false
date: 2025-09-03
tags:
  - knowledgebase
  - digital_garden
  - linux
  - logrotate
---
# [[logrotate-woes]]
What happens when I don't touch something for a long time? I forget all the fine details, and of course it struck again. This time it was all about setting a proper rotation for a log file using Rocky 9, logrotate, rsyslog and all the modern facilities
## The Problem
Rotate logs for a dns server - sounds so simple
## What i thought will work?
Set up log rotation for a certain size, and for daily rotation. Eg. if the log file goes over 5g rotate, or rotate daily. 
## Platform 
Rocky linux 9.6
## What actually happens?
Logrotate by default on Rocky linux runs once a day, so the size truncation could work only if I changed the schedule to make it run at least once an hour if not with a higher frequency. Everyone talks about doing this through cron which is not necessarily the best way to do it to begin with since by default it runs with a systemd timer.
So here is my logrotate configuration for this particular log file:
```bash
# /etc/logrotate.d/powerdns
/var/log/pdns.log {
    daily
    size 500M
    rotate 14
    compress
    delaycompress
    missingok
    notifempty
    create 0640 root root
    postrotate
        systemctl reload rsyslog > /dev/null 2>&1 || true
    endscript
}
```
everything looks fine, and in theory it should be rotated either on a file larger tham 500M, or daily, but one thing I of course didn't do in all my self confidence was actually run logrotate, which would have told me that size overrides rotate directive, and the rotation will only be size based.
My solution was to remove the size directive completely and just rely on the daily rotation since the log file size came up to 1/5 of what I initially wanted to rotate at.
## Bonus knowledge
How to redirect from rsyslog to a file without using a logging facility - use the application name!
```bash 
# /etc/rsyslog.d/powerdns.conf
if $programname == 'pdns_server' then /var/log/pdns.log
& stop # stops writing this line to other logs (syslog, etc ...)
```
How to log relevant information from powerdns:
```bash
# /etc/pdns/pdns.conf
...
log-dns-details=yes
log-dns-queries=yes
log-timestamp=yes
loglevel=5
...
```