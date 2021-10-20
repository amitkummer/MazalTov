docker_build('backend-image', 'backend',
    dockerfile="backend/docker-images/development",
    live_update=[
        sync('backend', '/backend')
    ])
docker_build('frontend-image', 'frontend',
    target='build',
    entrypoint=['npm', 'run', 'dev'],
    live_update=[
        sync('frontend', '/frontend')
    ])
k8s_yaml('deployment.yaml')
