#!/bin/bash
START=1
END=5
echo "Commit Count:"

for (( i = 1; i <= 6; i++ ))
do
	echo $i
	echo "hello world" >> txt.txt 
	git add .
	git commit -m "add hello world to txt.txt again"
	sleep 1
done

echo
echo "That pixel is looking greeeeeen!!!"