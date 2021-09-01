## Prerequisites

Make sure to have K3d and Tilt installed.

K3d version `v4.1.0` and Tilt version `v0.22.3` were used when configuring this repository.

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
