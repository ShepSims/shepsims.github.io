# Not liking the way your GitHub page looks because you aren't an active developer?  
# Fix that quickly and easily with commit bullit
 
echo    Commit Blaster 9000
echo  copyright Shep Sims 2021
echo
echo Make sure you have a git repo already initialized and linked to you current working directory
echo 
echo here we go
echo

touch commitbullit.js


for (( i = 1; i <= 100; i++ ))
do
	lineNumber=$(( $RANDOM % 50 ))
	lineNumber2=$(($lineNumber+ $RANDOM % 50))
	echo commit number $i
	sed -n $lineNumber,$lineNumber2'p' ./gravity/js/particle.js >> commitbullit.js # grabs random 
	git add .
	git commit -m "add lines starting at $lineNumber to commitbullit.txt"
	sleep 2
done

echo
echo "That pixel is looking greeeeeen!!!"