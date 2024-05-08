const https = require('https')
const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
function center(s, max, c) {
	return s
		.padStart(s.length + Math.floor((max - s.length) / 2), c)
		.padEnd(max, c)
}
const header = (entries, date, comment) => {
	let ext = comment == '#' ? '.txt' : '.adblock'
	return (
		comment +
		' Title: d3Host List by d3ward\n' +
		comment +
		' Expires: 1 days\n' +
		comment +
		' Description: Simple and small list with the most popular advertising, tracking, analytics and social advertising services\n' +
		comment +
		' Homepage: https://github.com/d3ward/toolz\n' +
		comment +
		' License: CC BY-NC-SA\n' +
		comment +
		' Source: https://github.com/d3ward/toolz/blob/master/src/d3host' +
		ext +
		'\n\n' +
		comment +
		' This list cover all the tests on https://d3ward.github.io/toolz/adblock\n' +
		comment +
		' Type : Stable\n' +
		comment +
		' Entries : ' +
		entries +
		'\n' +
		comment +
		' Updated On: ' +
		date +
		'\n' +
		comment +
		' Created by: d3ward'
	)
}
function test(obj, comment, pre, post) {
	Object.keys(obj).forEach((category) => {
		let value = obj[category]
		Object.keys(value).forEach((key) => {
			let value2 = value[key]
			if (value2)
				value2.forEach((v) => {
					https
						.get('https://' + v, (res) => {
							if (res.statusCode >= 200 && res.statusCode < 300)
								console.log(
									chalk.green(`${v}: ${res.statusCode}`)
								)
							else if (
								res.statusCode >= 300 &&
								res.statusCode < 400
							)
								console.log(
									chalk.blue(`${v}: ${res.statusCode}`)
								)
							else if (res.statusCode == 404)
								console.log(
									chalk.red(`${v}: ${res.statusCode}`)
								)
							else
								console.log(
									chalk.magenta(`${v}: ${res.statusCode}`)
								)
						})
						.on('error', (error) => {
							console.error(`${v}: ${error.message}`)
						})
				})
		})
	})
}
function build(obj, comment, pre, post) {
	let txt = ''
	let entries = 0
	Object.keys(obj).forEach((category) => {
		let value = obj[category]
		txt += '\n\n' + comment + center(' ' + category + ' ', 30, '=') + '\n'
		Object.keys(value).forEach((key) => {
			let value2 = value[key]
			txt += '\n' + comment + ' --- ' + key + '\n'
			if (value2)
				value2.forEach((v) => {
					entries++
					txt += pre + v + post + '\n'
				})
		})
	})
	if (pre == '||')
		txt +=
			'\n*$3p,domain=d3ward.github.io\n/pagead.js$domain=d3ward.github.io\n@@*$redirect-rule,domain=d3ward.github.io\nd3ward.github.io##.textads'
	const date = new Date()
	const d =
		date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
	return header(entries, d, comment) + txt
}
function write(output, input) {
	fs.writeFile(output, input, { encoding: 'utf8' }, function (err) {
		if (err) {
			return console.error(err)
		}
		fs.readFile(output, function (err, data) {
			if (err) {
				return console.error(err)
			}
			console.log('Created \n' + output)
		})
	})
}
fs.readFile(
	path.resolve(__dirname, '../data/adblock_data.json'),
	'utf8',
	(err, jsonString) => {
		if (err) {
			console.log('Error reading file from disk:', err)
			return
		}
		try {
			const obj = JSON.parse(jsonString)
			test(obj)
			write(
				path.resolve(__dirname, '../d3host.txt'),
				build(obj, '#', '0.0.0.0 ', '')
			)
			write(
				path.resolve(__dirname, '../d3host.adblock'),
				build(obj, '!', '||', '^')
			)
		} catch (err) {
			console.log('Error parsing JSON string:', err)
		}
	}
)
