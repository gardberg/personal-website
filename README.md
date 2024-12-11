# gardberg.xyz

Code for my personal website gardberg.xyz

# Terraform

Created bucket to store terraform state in under /terraform/bootstrap.

### TODO

- [x] Fix syntax highlighting in blog posts
- [x] Add a separate component for blog posts
- [x] Make faviocon show
- [x] set up CD
- [x] set up https
- [x] add custom hostname
- [x] reduce image size
  - [x] removed unecessary packages
  - [x] multi stage build
- [ ] fix pdf preview on chrome mobile
  - a bit of a hassle, tried google docs hosting, slow
- [x] add rolling update & healthcheck endpoint
- [ ] move .mdx blog posts to external place
- [ ] helm
- [ ] sealed secrets

- [x] terraform validation
- [x] apply on full config instead of only targeting the cloud run service
- [ ] local forwarding rules instead of global
  - [x] vpc network
    - [x] subnet
  - [x] proxy only subnet
  - [ ] new regional ip
  - [ ] serverless neg
  - [ ] regional backend service
  - [ ] add neg to backend service
  - [ ] regional url map
  - [ ] https/http proxies
- [ ] update dns records with new ip
- [ ] try out locally with terraform apply
- [ ] run ci cd
