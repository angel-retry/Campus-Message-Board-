let serverURL = 'https://script.google.com/macros/s/AKfycbzsDoH3bOwykNzAC6vTl1mn6VLS-zFX78Ioq4gV_AHtTnrM2h0ble_mZQE2-C8Yqojp/exec'

$(document).ready(function() {
    readFromServer();
});

function readFromServer() {
    let parameter = {};
    parameter.method = 'read1';
    $.post(serverURL, parameter, function(data){
        setPost(data);
    }).fail(function(data) {
        alert('error');
    });
}

function setPost(sData){
    let node = $('#template01').html();
    for(let i=0;i<sData.length;i++){
        let content = node.replace('LIST_HERE',i+1);
        content = content.replace('USERNAME_HERE',sData[i][2]);
        content = content.replace('SCHOOLNAME_HERE',sData[i][3]);
        content = content.replace('FEELING_HERE',sData[i][5]);
        content = content.replace('TIME_HERE',sData[i][1]);
        content = content.replace('TITLE_HERE',sData[i][6]);
        content = content.replace('TEXT_HERE',sData[i][7]);
        $('.col').append(content);
    }
    
}
// function setTable(sData) {
//     let node = $('#template01').html();
//     for(let i=0;i<sData.length;i++){
//         let content = node.replace('LIST_HERE',i+1);
//         content = content.replace('STYPE_HERE',sData[i][3]);
//         content = content.replace('SNAME_HERE',sData[i][2]);
//         content = content.replace('MAIL_HERE',sData[i][7]);
//         content = content.replace('TITLE_HERE',sData[i][4]);
//         content = content.replace('NAME_HERE',sData[i][1]);
//         $('tbody').append(content);
//     }
// }