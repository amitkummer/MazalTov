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
    set=['images.frontend.repository=frontend-image', 'images.frontend.tag=dev',
         'images.backend.repository=backend-image', 'images.backend.tag=dev'])
k8s_yaml(yaml)
