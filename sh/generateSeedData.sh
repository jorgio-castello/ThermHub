# Delete stale therm data
file=$(pwd)/src/ThermHub_PastData.js
if [ -f $file ] ; then
    rm $file
fi

# Generate New Data
seedGenerationFile=$(pwd)/seedData/index.js
echo $seedGenerationFile
node $seedGenerationFile
