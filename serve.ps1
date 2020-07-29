Write-Host "Starting Docker container to run build server"

docker run -it --rm -p 4001:4000 -p 35730:35729 -v ${pwd}:/build/source:rw aemdesign/centos-java-buildpack bash --login /build/source/docker-serve.sh
