// This loads the video list's content
var json;
var tbody = document.getElementsByTagName('tbody')[0];
var loadMore = document.getElementById('load_more');
const listReq = new XMLHttpRequest();
listReq.open('GET', '/movieList');
listReq.send();

var C = 0;
function loadRows() {
	let c = C; C += 69;
	for (; c < C; c++) {
		if (c > json.length - 1) {
			loadMore.remove();
			break;
		}

		const tbl = json[c];
		const date = tbl.date.substr(0, 10) + ' ' + tbl.date.substr(11);
		tbody.insertAdjacentHTML('beforeend',
			'<tr id="video-' + tbl.id + '" class="video draggable-row ui-draggable" data-drag-video="' + tbl.id + '" data-drag-video-current-folder=""><td class="td-thumbnail"><div class="status-container"><div class="vthumb vthumb-64"><div class="vthumb-clip"><div class="vthumb-clip-inner"><span class="valign"></span><img src="/movie_thumbs/' + tbl.id + '.png" alt></div></div></div><div class="status draft"><span class="draft-text">Draft</span><span class="password-protected-text">Password-Protected</span><span class="private-text">Private</span></div></div></td><td class="td-title"><div><span class="title">' + tbl.title.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + '</span></div><span class="duration text-note">' + '(' + tbl.id + ') ' + tbl.durationString + '</span></div></div></td><td class="td-date"><div class="datetime"><div class="grid-row-cell datetime">' + date + '</div></div></td><td class="td-tools hidden-mobile"><div class="tools-container"><div class="btn-group btn-group-compact pull-left"><a class="btn btn-link" href="/videomaker/full/?movieId=' + tbl.id + '"><span class="glyph-pro glyph-pencil"></span></a></div><div class="btn-group btn-group-compact divider"><a class="btn btn-link" href="/videos/?movieId=' + tbl.id + '"><span class="glyph-pro glyph-play"></span></a></div><div class="btn-group btn-group-compact pull-right"> <a class="btn btn-link" data-toggle="dropdown"> <span class="glyph-pro glyph-more text-larger"></span> </a> <ul class="dropdown-menu dropdown-menu-right" role="menu" aria-labelledby="dLabel"> <li> <a href="/movies/' + tbl.id + '.xml" download="' + tbl.title + '"> <span class="glyph-pro glyph-download-alt"></span> Download Video XML </a> </li><li> <a href="#" data-action="video-delete" data-video="' + tbl.id + '"> <span class="glyph-pro glyph-bin"></span> Delete </a> </li></ul> </div></div></td></tr>');
	}
}

loadMore.onclick = loadRows;
listReq.onreadystatechange = function (e) {
	if (listReq.readyState != 4) return;
	json = JSON.parse(listReq.responseText);
	loadRows();
}

function popup(id) {
	window.open('/player?movieId=' + id, 'MsgWindow', 'width=1280,height=723,left=' + (screen.width / 2 - 640) + ',top=' + (screen.height / 2 - 360));
}
	