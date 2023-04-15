window.onload = function () {
    // 循環顯示div
    function showdiv(divID) {
        var divNone = document.getElementsByClassName('divShow')
        for (var i = 0; i < divNone.length; i++) {
            divNone[i].style.display = 'none'
        }
        divID.style.display = 'block'
    }
    // 循環顯示div，套用在按鈕上
    btn1.onclick = () => { showdiv(div1) }
    btn2.onclick = () => { showdiv(div2) }
    btn3.onclick = () => { showdiv(div3) }
    btn4.onclick = () => { showdiv(div4) }

    // 今日日期、時間
    function addDate() {
        var oDate = new Date()
        var htr = oDate.getHours() + ':' + oDate.getMinutes() + ':' + oDate.getSeconds()
        var dtr = oDate.getFullYear() + '-' + (oDate.getMonth() + 1) + '-' + oDate.getDate()
        return dtr + '~' + htr
    }

    // 查詢「瀏覽器本地存儲」中的內容，編號到幾號，返回下一個新編號
    function localNum(name) {
        for (var j = 1; j < 99999; j++) {
            if (!localStorage[name + j]) {
                // 不能用break，會中斷函數
                // break
                return j
            }
        }
    }
    // 輸入的佛號數字，導入「瀏覽器本地存儲」，並加上日期，並且顯示在div
    nfShow.innerHTML = ''
    btnSave1.onclick = () => {
        var nf1 = nfNum1.value
        if (!nf1) {
            alert('請輸入數目')
        } else {
            localStorage['nf' + localNum('nf')] = addDate() + ' 念佛' + nf1 + '聲'
            nfShow.innerHTML += addDate() + ' 念佛' + nf1 + '聲<br>'
            nfNum1.value = null
        }
    }
    // 查詢「瀏覽器本地存儲」中的內容，全部導入陣列，並返回陣列
    var DataAll = []
    function localDataAll(name) {
        for (var j = 1; j < 99999; j++) {
            if (localStorage[name + j]) {
                DataAll.push(localStorage[name + j])
            } else {
                // 這裡可以加break，會快很多
                break
            }
        }
    }
    // 查詢「瀏覽器本地存儲」中的內容，全部導入陣列，並返回
    btnSearch1.onclick = () => {
        // 查詢內容
        localDataAll('nf')
        // 顯示
        // nfShow.innerHTML = DataAll.join('<br>')
        alert(DataAll.join('\n'))
        // 清除使用過的陣列
        DataAll.length = 0
    }

    // 輸入功課數字，導入「瀏覽器本地存儲」，並加上日期，並且顯示在div
    gkShow.innerHTML = ''
    btnSave2.onclick = () => {
        var gk1 = gkNum1.value
        var gk2 = gkNum2.value
        // 檢查是否有輸入資料
        if (!gk1 || !gk2) {
            alert('請輸入"功課名稱"與"數目"')
        } else {
            localStorage['gk' + localNum('gk')] = addDate() + ' ' + gk2 + gk1 + '遍'
            gkShow.innerHTML += addDate() + ' ' + gk2 + gk1 + '遍<br>'
            gkNum1.value = null
        }
        // 儲存功課名稱
        if (!localStorage['gkHead'] || localStorage['gkHead'] != gk2) {
            localStorage['gkHead'] = gk2
        }
    }
    // 儲存功課名稱，並先顯示在文本框
    if (localStorage['gkHead']) {
        gkNum2.value = localStorage['gkHead']
    }

    // 查詢「瀏覽器本地存儲」中的內容，全部導入陣列，並返回
    btnSearch2.onclick = () => {
        // 查詢內容
        localDataAll('gk')
        // 顯示
        // gkShow.innerHTML = DataAll.join('<br>')
        alert(DataAll.join('\n'))
        // 清除使用過的陣列
        DataAll.length = 0
    }

    // 刪除所有記錄
    btnClean1.onclick = () => {
        if (confirm('確定要刪除所有記錄？')) {
            localStorage.clear()
            // 無法檢查是否完成，直接回報而已
            alert('刪除完畢')
        }
    }
    // 刪除各項記錄
    function DellocalDataAll(name) {
        for (var j = 1; j < 99999; j++) {
            if (localStorage[name + j]) {
                delete localStorage[name + j]
            } else {
                // 這裡可以加break，會快很多
                break
            }
        }
    }
    // 刪除所有念佛記錄
    btnClean2.onclick = () => {
        // 詢問使用者
        if (confirm('確定要刪除所有念佛記錄？')) {
            DellocalDataAll('nf')
            // 檢查是否完成
            if (localNum('nf') == 1) {
                alert('刪除完畢')
            }
        }
    }
    // 刪除所有功課記錄
    btnClean3.onclick = () => {
        // 詢問使用者
        if (confirm('確定要刪除所有功課記錄？')) {
            DellocalDataAll('gk')
            // 檢查是否完成
            if (localNum('gk') == 1) {
                alert('刪除完畢')
            }
        }
    }
}