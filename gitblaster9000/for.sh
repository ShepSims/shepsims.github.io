# Not liking the way your GitHub page looks because you aren't an active developer?  
# Fix that quickly and easily with commit bullit

# you'll need to run chmod 755 for.sh so that you can execute it as a script
# then start up with ./for.sh
 
echo    Commit Blaster 9000
echo  copyright Shep Sims 2021
echo
echo Make sure you have a git repo already initialized and linked to you current working directory
echo 
echo here we go
echo
echo
touch gitblaster9000.js


for (( i = 1; i <= 10; i++ ))
do
	lineNumber=$(( $RANDOM % 50 ))
	lineNumber2=$(($lineNumber+ $RANDOM % 50))
	echo commit number $i
	sed -n $lineNumber,$lineNumber2'p' ../gravity/js/particle.js >> gitblaster9000.js #Whatever fil 
	git add .
	git commit -m "copy lines $lineNumber to $lineNumber2 to gitblaster9000.js"
	sleep 2
done

echo
echo "That pixel is looking greeeeeen!!!"