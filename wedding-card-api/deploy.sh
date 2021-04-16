set -e

bash build.sh $1

cd ..

tcb login

tcb fn deploy $1 --force