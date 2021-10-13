docker_build('backend-image', 'backend',
    live_update=[
        sync('backend', '/backend')
    ])
docker_build('frontend-image', 'frontend',
    dockerfile="frontend/docker-images/development",
    live_update=[
        sync('frontend', '/frontend')
    ])
k8s_yaml('deployment.yaml')
