class urlParser {
	constructor(_url) {
		this.urlPath = ''
		this.pathParams = []
		this.queryParams = {}
		this.url = _url
		this.parse()
	}

	//Used when register the router
	static register(_url) {
		let generalizedUrl = '/'
		let urlRegexPattern = '^/'
		let path = []
		let pathParamNumber = 0

		for (let p of _url.split('/')) {
			if (!p) {
				continue
			}
			if (p.startsWith(':')) {
				generalizedUrl += (pathParamNumber + '/')
				pathParamNumber += 1
				path.push({
					name: p.slice(1),
					value: null,
					isVariable: true
				})
			
				urlRegexPattern += '[a-zA-Z0-9].*/'
			} else {
				if (p.indexOf('.') > 0) {
					generalizedUrl += p
					urlRegexPattern += p
				} else {
					generalizedUrl += (p + '/')
					urlRegexPattern += (p + '/')
				}
				path.push({
					name: p,
					value: p,
					isVariable: false
				})
			}
		}
		
		urlRegexPattern += '$'
		return {
			generalizedUrl,
			urlRegexPattern,
			path
		}
	}

	// private
	parse() {
		const urlAfterSplit = this.url.split('?')
		const urlPath = urlAfterSplit[0]
		this.urlPath = urlPath
		const urlQueryParam = urlAfterSplit[1]
		this.parsePathParams(urlPath)
		this.parseQueryParams(urlQueryParam)
	}
	
	// private
	parsePathParams(pathParam) {
		let pathParamNumber = 0
		for (let p of pathParam.split('/')) {
			if (!p) {
				continue
			}
			this.pathParams.push(p)
		}
	}

	// private
	parseQueryParams(urlQueryParam) {
		if (!urlQueryParam) {
			return
		}
		for (let q of urlQueryParam.split('&')) {
			let pair = q.split('=')
			this.queryParams[pair[0]] = pair[1]
		}
	}
}

// below are tests
/*
const t = new urlParser('/user/:id/?t=12&m=22')
console.log(t.generalizedUrl)
console.log('---------')
const t2 = new urlParser('/user/:id/')
console.log(t2.generalizedUrl)
console.log('---------')
console.log(urlParser.register('/user/:id/'))
console.log('---------')
console.log(urlParser.register('/'))
*/
module.exports = urlParser
