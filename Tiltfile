docker_build('backend-image:dev', 'backend',
    dockerfile="backend/docker-images/development",
    live_update=[
        sync('backend', '/backend')
    ])
docker_build('frontend-image:dev', 'frontend',
    target='build',
    entrypoint=['npm', 'run', 'dev'],
    live_update=[
        sync('frontend', '/frontend')
    ])
yaml = helm(
    './charts/birthday-calendar',
    values='charts/birthday-calendar/values.dev.yaml')
k8s_yaml(yaml)
