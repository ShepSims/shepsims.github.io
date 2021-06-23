# Not liking the way your GitHub page looks because you aren't an active developer?  
# Fix that quickly and easily with commit bullit
 
echo Commit Bullit
echo copyright Shep Sims 2021
echo
echo Make sure you have a git repo already initialized and linked to the current directory
touch commitbullit.txt

# get a random line number
lineNumber = awk -v min=5 -v max=10 'BEGIN{srand(); print int(min+rand()*(max-min+1))}'

for (( i = 1; i <= 100; i++ ))
do
	echo commit number $i
	sed -n '$lineNumber,$lineNumber+5' ./gravity/js/particle.js >> commitbullit.txt
	git add .
	git commit -m "add lines starting at $lineNumber to commitbullit.txt"
	sleep 2
done

echo
echo "That pixel is looking greeeeeen!!!"