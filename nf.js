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
    // 顯示「刪除所有記錄」按鈕，套用在按鈕上
    btnClean0.onclick = () => {
        var buttonNone = document.getElementsByClassName('clean')
        for (var i = 0; i < buttonNone.length; i++) {
            if (buttonNone[i].style.display == 'none') {
                buttonNone[i].style.display = 'block'
            } else {
                buttonNone[i].style.display = 'none'
            }
        }
    }

    // 通用函式
    // 今日日期、時間
    function addDate() {
        var oDate = new Date()
        var dtr = oDate.getFullYear() + '-' + (oDate.getMonth() + 1) + '-' + oDate.getDate()
        var htr = oDate.getHours() + ':' + oDate.getMinutes() + ':' + oDate.getSeconds()
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
    // 查詢「瀏覽器本地存儲」中的內容，全部導入陣列，並返回陣列
    var DataAll = []
    function localDataAll(name) {
        for (var j = 1; j < 99999; j++) {
            if (localStorage[name + j]) {
                // 加上樣式，區分日期、人名
                DataAll.push(localStorage[name + j].replace(/([^~]+)(~[^ ]+ )(.+)/,'<span>$1</span>$2<font>$3</font>'))
            } else {
                // 這裡可以加break，會快很多
                break
            }
        }
    }
    // 查詢「瀏覽器本地存儲」中的內容，統計總數，並返回數字
    function localDataSum(name) {
        var DataSum = 0
        for (var j = 1; j < 99999; j++) {
            if (localStorage[name + j]) {
                // 加上樣式，區分日期、人名
                DataSum += Number(localStorage[name + j].replace(/[^ ]+ \D+(\d+)\D+/, '$1'))
            } else {
                // 這裡可以加break，會快很多
                break
            }
        }
        return DataSum
    }
    function Copy() {
        // 結束時選取並複製文本框中的內容
        txt1.select()
        document.execCommand('Copy')
        alert('已複製你查詢的內容，可以直接到別的APP中『貼上」')
    }

    // 輸入的佛號數字，導入「瀏覽器本地存儲」，並加上日期，並且顯示在div
    // 記錄頁面有無東西
    var s1, s2
    nfShow.innerHTML = ''
    btnSave1.onclick = () => {
        var nf1 = nfNum1.value
        if (!nf1) {
            alert('請輸入數目')
        } else {
            localStorage['nf' + localNum('nf')] = addDate() + ' 念佛' + nf1 + '聲'
            // 頁面有查詢內容，就歸零
            if (s1 == 1) {
                nfShow.innerHTML = ''
                s1 = 0
            }
            nfShow.innerHTML += addDate() + ' 念佛' + nf1 + '聲<br>'
            nfNum1.value = null
        }
    }
    // 查詢「瀏覽器本地存儲」中的內容，全部導入陣列，並返回
    btnSearch1.onclick = () => {
        // 查詢內容
        localDataAll('nf')
        // 顯示
        nfShow.innerHTML = DataAll.join('<br>')
        // alert(DataAll.join('\n'))
        // 清除使用過的陣列
        DataAll.length = 0
        // 記錄頁面已有資料
        s1 = 1
    }
    // 查詢「瀏覽器本地存儲」中的內容，統計總數，並返回數字
    btnSum1.onclick = () => {
        // 查詢內容+顯示
        nfShow.innerHTML = '總計' + localDataSum('nf') + '聲'
        // 記錄頁面已有資料
        s1 = 1
    }
    btnCopy1.onclick = () => {
        txt1.value = nfShow.innerText
        Copy()
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
            // 頁面有查詢內容，就歸零
            if (s2 == 1) {
                gkShow.innerHTML = ''
                s2 = 0
            }
            gkShow.innerHTML += addDate() + ' ' + gk2 + gk1 + '遍<br>'
            gkNum1.value = null
        }
        // 儲存功課名稱
        if (!localStorage['gkHead'] || localStorage['gkHead'] != gk2) {
            localStorage['gkHead'] = gk2
        }
    }
    // 儲存功課名稱，啟動程式時先顯示在文本框
    if (localStorage['gkHead']) {
        gkNum2.value = localStorage['gkHead']
    }
    // 查詢「瀏覽器本地存儲」中的內容，全部導入陣列，並返回
    btnSearch2.onclick = () => {
        // 查詢內容
        localDataAll('gk')
        // 顯示
        gkShow.innerHTML = DataAll.join('<br>')
        // alert(DataAll.join('\n'))
        // 清除使用過的陣列
        DataAll.length = 0
        // 記錄頁面已有資料
        s2 = 1
    }
    // 查詢「瀏覽器本地存儲」中的內容，統計總數，並返回數字
    btnSum2.onclick = () => {
        // 查詢內容+顯示
        gkShow.innerHTML = '總計' + localDataSum('gk') + '遍'
        // 記錄頁面已有資料
        s2 = 1
    }
    btnCopy2.onclick = () => {
        txt1.value = gkShow.innerText
        Copy()
    }

    // 刪除所有記錄
    btnClean1.onclick = () => {
        // 詢問使用者：客戶要求問3次！
        if (confirm('你確定要執行刪除所有記錄？')) {
        if (confirm('不後悔嗎？真的決定刪除？')) {
        if (confirm('最後一次問你：確定要刪除所有記錄？')) {
            localStorage.clear()
            // 無法檢查是否完成，直接回報而已
            alert('刪除完畢')
        }
        }
        }
    }
    // 刪除各項記錄
    function DellocalDataAll(name, text3) {
        // 詢問使用者：客戶要求問3次！
        if (confirm('你確定要執行刪除資料？')) {
        if (confirm('不後悔嗎？真的決定刪除？')) {
        if (confirm('最後一次問你：確定要刪除所有' + text3 + '記錄？')) {
            for (var j = 1; j < 99999; j++) {
                if (localStorage[name + j]) {
                    delete localStorage[name + j]
                } else {
                    // 這裡可以加break，會快很多
                    // break
                    // 也可以直接回報
                    return alert('刪除完畢')
                }
            }
            // 檢查是否完成
            // if (localNum(name) == 1) {
            //     alert('刪除完畢')
            // }
        }
        }
        }
    }
    // 刪除所有念佛記錄
    btnClean2.onclick = () => {
        DellocalDataAll('nf', '念佛')
    }
    // 刪除所有功課記錄
    btnClean3.onclick = () => {
        DellocalDataAll('gk', '功課')
    }
}