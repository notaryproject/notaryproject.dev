---
title: "Redesigning Notary in a Multi-registry World - Justin Cormack, Docker"
description: Notary, used to secure container image updates, is the most widely adopted implementation of the TUF protocol. However, since Notary’s design around Docker Hub in 2015, container registries have proliferated and...
yt_embed: https://www.youtube.com/embed/rB8-rUtrtXM
expanded_description: Notary, used to secure container image updates, is the most widely adopted implementation of the TUF protocol. However, since Notary’s design around Docker Hub in 2015, container registries have proliferated and some of the design decisions don’t support the needs of a multi-registry world. This talk looks at redesigning the model to allow portability of container images between registries with signature data stored alongside the image data allowing it to be pushed and pulled alongside the image. This reworking of Notary will enable easier portability of images, and improve supply chain security by enabling mirrors and users of mirrors to validate image data, allowing users to easily work with cloud and local registries, offline caches and other common architectures.
duration: 35 mins
views: 762 views
dates: 22nd Nov, 2019
yt_url: https://www.youtube.com/watch?v=rB8-rUtrtXM
---
