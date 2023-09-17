#!/bin/bash

npx sequelize-cli model:generate --name "$1" --attributes "$2"
