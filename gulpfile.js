const {src, dest, series} = require("gulp");

// Обробляємо html файли
function html(){
return src("app/**/*/.html") // Беремо файли з розширенням html із папки app/ та усіх інших підпапок
    .pipe(dest("build/")); // переміщуємо у папку build
}


// Обробляємо файли зображень
function img(){
    return src("app/img/*/.{png,jpg,jpeg,gif}", // Беремо файли з розширенням png, jpg, jpeg, gif
    {base: "app"})                              // Задаємо параметр base, щоб зберігати вложеність файлів
    .pipe(dest("build/"));                      // переміщуємо у папку build
    }


    // Публікуємо зібраний сайт на github
function deployOnGitHub() {
    return gh_pages
          .publish("build",                              // Папка, вміст якої заливається на github
                   { message: "Auto-generated commit" }, // Текст коміту
                   deploy_result);                       // Обробка можливих помилок
}

// ...............................................................................................

// Збирання проекту
exports.build = series(html, img);

// Завдання за замовчуванням
// exports.default = parallel(series(exports.build, browserSync), watchForFiles);

// Збирання проекту та публікація його на github
exports.deploy = series(exports.build, deployOnGitHub);
