docker_build('backend-image', 'backend',
    live_update=[
        sync('backend', '/backend')
    ])
k8s_yaml('deployment.yaml')
