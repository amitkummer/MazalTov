## Prerequisites

Make sure to have Helm, K3d and Tilt installed.

H3lm version `v3.7.1`, K3d version `v4.1.0` and Tilt version `v0.22.3` were used when configuring this repository.

## Development

To create the cluster, deploy and watch files:

```s
$ k3d cluster create --config k3d.yaml
$ tilt up
```

To delete the cluster:

```s
$ k3d cluster delete birthdays
```

```
foo:3UizLd!C
```

## Deployment

In `values.yaml` in the project root edit the required values such as:

1. `backend.key` will be used as Django's secret key. Should be base64 encoded.
