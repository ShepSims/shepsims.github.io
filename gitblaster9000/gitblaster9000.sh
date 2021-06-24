# Not liking the way your GitHub page looks because you aren't an active developer and your pixels are all dim?  
# Fix that by being an active developer, not by using this tool ya goob ;)

# Run chmod 755 gitblaster9000.sh so that you can execute it as a script
# then start up with ./gitblaster9000.sh
# If you didn't clone the entire repo you'll need to point it at a file of your own so replace ../gravity/js/particle.js with your own source code file
 
echo    Git Blaster 9000
echo  copyright Shep Sims 2021
echo
echo Make sure you have a git repo already initialized and linked to you current working directory
echo 
echo here we go
echo
echo
touch gitblaster9000.js


for (( i = 1; i <= 1000; i++ ))
do
	lineNumber=$(( $RANDOM % 50 ))
	lineNumber2=$(($lineNumber+ $RANDOM % 50))
	echo commit number $i
	sed -n $lineNumber,$lineNumber2'p' ../gravity/js/particle.js >> gitblaster9000.js #Whatever fil 
	git add .
	git commit -m "copy lines $lineNumber to $lineNumber2 to gitblaster9000.js"
done

echo
echo "That pixel is looking greeeeeen!!!"