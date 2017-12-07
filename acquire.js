var platform = process.platform;

function getPlatform() {
    switch (platform) {
        case "darwin": return "darwin";
        case "linux": return "linux";
        case "win32": return "windows";
        default: throw new Error("Platform '" + platform + "' not supported.");
    }
}
function getEnding() {
    switch (platform) {
        case "win32": return ".exe";
        default: return "";
    }
}

var version = "v0.3.2";
var url = "https://github.com/golang/dep/releases/download/" + version + "/dep-" + getPlatform() + "-amd64";

function httpsGet(url, onResponse) {
    require("https").get(url, function (response) {
        if (response.headers.location) httpsGet(response.headers.location, onResponse);
        else onResponse(response);
    });
}

function tryChmod() {
    try { require("child_process").execSync("chmod +777 dep", { cwd: __dirname }); }
    catch(_) { } 
}

httpsGet(url, function (response) {


    response.pipe(require("fs").createWriteStream(__dirname + "/dep" + getEnding())).on("end", tryChmod).on("finish", tryChmod);
});
