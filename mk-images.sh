#!/bin/bash

##################################################################
# Make a bunch of iOS App icons from a Master
# Given an image at least 512x512 pixels named icon.png, resize and create a
# duplicate at each specified size. Add new sizes as needed. When finished,
# copy the resulting images into your Xcode iOS project.

outDir="ios/App/App/Assets.xcassets/AppIcon.appiconset"
splashDir="ios/App/App/Assets.xcassets/Splash.imageset"
file="src/assets/icon/icon-512.png"

[ -d $outDir ] || mkdir -p $outDir
sips -z 20 20 --out $outDir/AppIcon-20x20@1x.png $file
sips -z 40 40 --out $outDir/AppIcon-20x20@2x-1.png $file
sips -z 40 40 --out $outDir/AppIcon-20x20@2x.png $file
sips -z 60 60 --out $outDir/AppIcon-20x20@3x.png $file
sips -z 29 29 --out $outDir/AppIcon-29x29@1x.png $file
sips -z 58 58 --out $outDir/AppIcon-29x29@2x-1.png $file
sips -z 58 58 --out $outDir/AppIcon-29x29@2x.png $file
sips -z 87 87 --out $outDir/AppIcon-29x29@3x.png $file
sips -z 40 40 --out $outDir/AppIcon-40x40@1x.png $file
sips -z 80 80 --out $outDir/AppIcon-40x40@2x-1.png $file
sips -z 80 80 --out $outDir/AppIcon-40x40@2x.png $file
sips -z 120 120 --out $outDir/AppIcon-40x40@3x.png $file
sips -z 120 120 --out $outDir/AppIcon-60x60@2x.png $file
sips -z 180 180 --out $outDir/AppIcon-60x60@3x.png $file
sips -z 76 76 --out $outDir/AppIcon-76x76@1x.png $file
sips -z 152 152 --out $outDir/AppIcon-76x76@2x.png $file
sips -z 167 167 --out $outDir/AppIcon-83.5x83.5@2x.png $file
sips -z 1024 1024 --out $outDir/AppIcon-512@2x.png $file

# Now make the three splash screens too
sips -z 1024 1024 -p 2732 2732 --padColor ffffff --out $splashDir/splash-2732x2732-1.png $file
sips -z 1024 1024  -p 2732 2732 --padColor ffffff --out $splashDir/splash-2732x2732-2.png $file
sips -z 1024 1024  -p 2732 2732 --padColor ffffff --out $splashDir/splash-2732x2732.png $file

# Next make the Android splash screens from the 2732x2732 we made for iOS
androidSplashDir="android/app/src/main/res"
file="$splashDir/splash-2732x2732.png"
[ -d $androidSplashDir ] || mkdir -p $androidSplashDir

function resize {
  w=$2
  h=$3

  echo $file into $4

  [ -d "$androidSplashDir/$4" ] || mkdir $androidSplashDir/$4

  if [[ $w -ge $h ]]; then
    sips -Z $w -c $h $w --out $androidSplashDir/$4/splash.png $file
  else
    sips -Z $h -c $h $w --out $androidSplashDir/$4/splash.png $file
  fi
}

resize $file 480 320 drawable
resize $file 800 480 drawable-land-hdpi
resize $file 480 320 drawable-land-mdpi
resize $file 1280 720 drawable-land-xhdpi
resize $file 1600 960 drawable-land-xxhdpi
resize $file 1920 1280 drawable-land-xxxhdpi
resize $file 480 800 drawable-port-hdpi
resize $file 320 480 drawable-port-mdpi
resize $file 720 1280 drawable-port-xhdpi
resize $file 960 1600 drawable-port-xxhdpi
resize $file 1280 1920 drawable-port-xxxhdpi
