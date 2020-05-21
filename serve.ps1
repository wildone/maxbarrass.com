Write-Host "Starting Docker container to run build server"

docker run -it --rm -p 4000:4000 -p 35729:35729 -v ${pwd}:/build/source:rw aemdesign/centos-java-buildpack bash --login /build/source/docker-serve.sh
