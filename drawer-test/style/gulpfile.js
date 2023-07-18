// gulpプラグインの読み込み
const { src, dest, watch, series } = require("gulp");
// Sassをコンパイルするプラグインの読み込み
const sass = require('gulp-sass')(require('sass'));
// dart-sassに変更
sass.compiler = require('sass');
// ベンダープレフィックス自動付与
const autoprefixer = require('gulp-autoprefixer');
// css圧縮プラグイン
const comp = require('gulp-clean-css');
const vmRenameFile = require("gulp-rename");
// 改行コード変換プラグイン
const gulpLoadPlugins = require ('gulp-load-plugins');
const linePlugins = gulpLoadPlugins();
// 処理を一つタスクにまとめるためのプラグイン
//const merge = require('merge-stream');
// コンパイルエラー検知 強制終了防止
const plumber = require('gulp-plumber');
// css整形
var csscomb = require("gulp-csscomb");
const gulpStylelint = require('gulp-stylelint');

/**
 * コンパイル処理
 */
const compileSass = () => src('./scss/*.scss')
  .pipe(plumber({
    errorHandler: function (error) {

        this.emit('end');
    }
  }))
  .pipe(gulpStylelint({
    reporters: [
      { formatter: 'string', console: true }
    ]
  }))
  // Sassのコンパイルを実行
  .pipe(sass({
    outputStyle: 'expanded',
    indentType: 'tab',
    indentWidth: 1,
  }).on('error', sass.logError))
  .pipe(autoprefixer([
    'last 2 versions',
    'Android >= 4.4',
    'not IE > 0',
    'not ie_mob > 0',
    'not dead'
  ]))
  .pipe(csscomb())
  .pipe(linePlugins.lineEndingCorrector({
    verbose: false,
    eolc: 'CRLF'
  }))
  .pipe(dest("./css"));

/**
 * cssを圧縮し、vm出力する処理
 */
const compVM = () => src('./css/*.css')
  .pipe(comp())
  .pipe(vmRenameFile({
    extname: '.vm'
  }))
  .pipe(dest("./vm"));

/**
 * Sassファイルを監視し、変更があったらSassを変換します
 */
const watchSassFiles = () => watch("./scss/*.scss", series(compileSass, compVM));

// npx gulpコマンドを実行した時、watchSassFilesが実行されるように、デフォルトのタスクを設定します。
exports.default = series(compileSass, compVM, watchSassFiles);

