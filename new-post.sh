#!/bin/bash

read -p 'Post: ' name

date=$(date '+%Y-%m-%d %H:%M:%S')

mkdir content/_posts/$name

cat > content/_posts/$name/index.md <<- EOM
---
layout: post
title: $name
date: $date
updated: $date
tags: 
categories: 
---
EOM

echo "new post [$name] is created at $date"