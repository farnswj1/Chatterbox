worker_class = 'uvicorn_worker.UvicornWorker'
workers = 2
bind = '0.0.0.0:8000'
forwarded_allow_ips = '*'
accesslog = '-'
