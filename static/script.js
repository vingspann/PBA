/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ReferenceError: [BABEL] /home/ubuntu/workspace/PBA/scripts/main.js: Unknown option: direct.presets\n    at Logger.error (/home/ubuntu/workspace/PBA/node_modules/babel-loader/node_modules/babel-core/lib/transformation/file/logger.js:58:11)\n    at OptionManager.mergeOptions (/home/ubuntu/workspace/PBA/node_modules/babel-loader/node_modules/babel-core/lib/transformation/file/options/option-manager.js:126:29)\n    at OptionManager.init (/home/ubuntu/workspace/PBA/node_modules/babel-loader/node_modules/babel-core/lib/transformation/file/options/option-manager.js:216:10)\n    at File.initOptions (/home/ubuntu/workspace/PBA/node_modules/babel-loader/node_modules/babel-core/lib/transformation/file/index.js:147:75)\n    at new File (/home/ubuntu/workspace/PBA/node_modules/babel-loader/node_modules/babel-core/lib/transformation/file/index.js:137:22)\n    at Pipeline.transform (/home/ubuntu/workspace/PBA/node_modules/babel-loader/node_modules/babel-core/lib/transformation/pipeline.js:164:16)\n    at transpile (/home/ubuntu/workspace/PBA/node_modules/babel-loader/index.js:12:22)\n    at Object.module.exports (/home/ubuntu/workspace/PBA/node_modules/babel-loader/index.js:71:12)");

/***/ })
/******/ ]);