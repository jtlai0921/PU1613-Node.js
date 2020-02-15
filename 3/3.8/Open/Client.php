<?php
/**
 * iweibo2.0
 *
 * 開放平台動作類別
 *
 * @author gionouyang <gionouyang@tencent.com>
 * @link http://open.t.qq.com/iweibo
 * @copyright Copyright c 1998-2011. All Rights Reserved
 * @license http://open.t.qq.com/iweibo/license
 * @version $Id: Core_Open_Client.php 2011-06-09 16:15:00Z gionouyang $
 * @package Controller
 * @since 2.0
 */
class Core_Open_Client
{
    //傳回格式
    const RETURN_FORMAT = 'json';
    const OPEN_HOST = 'http://open.t.qq.com';

    /**
     * 建構函數
     *
     * @access public
     * @param mixed $wbakey 套用APP KEY
     * @param mixed $wbskey 套用APP SECRET
     * @param mixed $accecss_token OAuth認證傳回的token
     * @param mixed $accecss_token_secret OAuth認證傳回的token secret
     * @return void
     */
    function __construct($wbakey, $wbskey, $accecss_token = null, $accecss_token_secret = null)
    {
        $this->oauth = new Core_Open_Opent($wbakey, $wbskey, $accecss_token, $accecss_token_secret);
    }

    /*
     * 取得使用者訊息
     * @p 陣列,內含以下:
     * @f 分頁標誌（0：第一頁，1：向下翻頁，2向上翻頁）
     * @t 本頁起始時間（第一頁 0，繼續：根據傳回記錄時間決定）
     * @n 每次請求記錄的條數（1-20條）
     * @name: 使用者名稱 空表示本人
     * @return array
     * *********************/
    public function getTimeline($p)
    {
        if(! isset($p['name']))
        {
            $url = self::OPEN_HOST . '/api/statuses/home_timeline?f=1&type=4';
            $params = array('format' => self::RETURN_FORMAT, 'pageflag' => $p['f'], 'reqnum' => $p['n'],
            'pagetime' => $p['t'], 'type' => $p['utype'], 'contenttype' => $p['ctype']);
        }
        else
        {
            $url = self::OPEN_HOST . '/api/statuses/user_timeline?f=1';
            $params = array('format' => self::RETURN_FORMAT, 'pageflag' => $p['f'], 'reqnum' => $p['n'],
            'pagetime' => $p['t'], 'name' => $p['name'], 'lastid' => $p['l'], 'type' => $p['utype'],
            'contenttype' => $p['ctype']);
        }
        return $this->oauth->get($url, $params);
    }

    /*
     * 取得多使用者訊息
     * @p 陣列,內含以下:
     * @f 分頁標誌（0：第一頁，1：向下翻頁，2向上翻頁）
     * @t 本頁起始時間（第一頁 0，繼續：根據傳回記錄時間決定）
     * @n 每次請求記錄的條數（1-100條）
     * @names: 你需要讀取使用者清單用“,”隔開，例如：abc,bcde,effg
     * @return array
     * *********************/
    public function getUsersTimeline($p)
    {
        $url = self::OPEN_HOST . '/api/statuses/users_timeline?f=1';
        $params = array('format' => self::RETURN_FORMAT, 'pageflag' => $p['f'], 'reqnum' => $p['n'],
        'pagetime' => $p['t'], 'names' => $p['names'], 'type' => $p['utype'], 'contenttype' => $p['ctype']);
        return $this->oauth->get($url, $params);
    }

    /*
     * 同城廣播
     * @p 陣列,內含以下:
     * @p 記錄的起始位置（第一次請求是填0，繼續請求進填上次傳回的Pos）
     * @n 每次請求記錄的條數（1-20條）
     * @City 城市碼
     * @return array
     */
    public function getArea($p)
    {
        $url = self::OPEN_HOST . '/api/statuses/area_timeline?f=1';
        $params = array('format' => self::RETURN_FORMAT, 'pos' => $p['p'], 'reqnum' => $p['n'], 'city' => $p['city'],
        'province' => $p['province'], 'country' => $p['country']);
        return $this->oauth->get($url, $params);
    }

    /*
     * 廣播大廳訊息
     * @p 陣列,內含以下:
     * @p 記錄的起始位置（第一次請求是填0，繼續請求進填上次傳回的Pos）
     * @n 每次請求記錄的條數（1-20條）
     * @return array
     */
    public function getPublic($p)
    {
        $url = self::OPEN_HOST . '/api/statuses/public_timeline?f=1';
        $params = array('format' => self::RETURN_FORMAT, 'pos' => $p['p'], 'reqnum' => $p['n']);
        return $this->oauth->get($url, $params);
    }

    /*
     *取得關於我的訊息
     * @p 陣列,內含以下:
     * @f 分頁標誌（0：第一頁，1：向下翻頁，2向上翻頁）
     * @t 本頁起始時間（第一頁 0，繼續：根據傳回記錄時間決定）
     * @n 每次請求記錄的條數（1-20條）
     * @l 目前頁最後一條記錄，用用精確翻頁用
     * @type : 0 提及我的, other 我廣播的
     * @return array
     */
    public function getMyTweet($p)
    {
        $p['type'] == 0 ? $url = self::OPEN_HOST . '/api/statuses/mentions_timeline?f=1' : $url = self::OPEN_HOST .
         '/api/statuses/broadcast_timeline?f=1';
        $params = array('format' => self::RETURN_FORMAT, 'pageflag' => $p['f'], 'reqnum' => $p['n'], 'contenttype' => 4,
        'pagetime' => $p['t'], 'lastid' => $p['l'], 'type' => $p['utype'], 'contenttype' => $p['ctype']);
        return $this->oauth->get($url, $params);
    }

    /*
     *取得話題下的訊息
     * @p 陣列,內含以下:
     * @t 話題名字
     * @f 分頁標誌（PageFlag = 1表示向後（下一頁）查詢；PageFlag = 2表示向前（上一頁）查詢；PageFlag = 3表示前往最後一頁  PageFlag = 4表示前往最前一頁）
     * @p 分頁標誌（第一頁 填空，繼續翻頁：根據傳回的 pageinfo決定）
     * @n 每次請求記錄的條數（1-20條）
     * @return array
     * !htmlspecialchars_decode($p['t'])防止出現帶有特殊符號的話題頁面無關聯話題的情況
     */
    public function getTopic($p)
    {
        $url = self::OPEN_HOST . '/api/statuses/ht_timeline?f=1';
        $params = array('format' => self::RETURN_FORMAT, 'pageflag' => $p['f'], 'reqnum' => $p['n'],
        'httext' => htmlspecialchars_decode($p['t']), 'pageinfo' => $p['p']);
        return $this->oauth->get($url, $params);
    }

    /*
     *取得一條訊息
     * @p 陣列,內含以下:
     * @id 微網誌ID
     * @return array
     */
    public function getOne($p)
    {
        $url = self::OPEN_HOST . '/api/t/show?f=1';
        $params = array('format' => self::RETURN_FORMAT, 'id' => $p['id']);
        $ret =  $this->oauth->get($url, $params);
		return $ret;
    }

    /*
     *廣播一條訊息
     * @p 陣列,內含以下:
     * @c 微網誌內容
     * @ip 使用者IP(以分析使用者所在地)
     * @j 經度（可以填空）
     * @w 緯度（可以填空）
     * @p 圖片
     ******* type = 2,3,4
     * @r 父id
     * @type 1 廣播 2 轉播 3 對話 4 評論
     * @return array
     */
    public function postOne($p)
    {
        $params = array('format' => $p['format'], 'content' => $p['content'], 'clientip' => '',
        'jing' => '', 'wei' => '');
        switch($p['type'])
        {
            case 2:
                $url = self::OPEN_HOST . '/api/t/re_add?f=1';
                $params['reid'] = $p['r'];
                return $this->oauth->post($url, $params);
                break;
            case 3:
                $url = self::OPEN_HOST . '/api/t/reply?f=1';
                $params['reid'] = $p['r'];
                return $this->oauth->post($url, $params);
                break;
            case 4:
                $url = self::OPEN_HOST . '/api/t/comment?f=1';
                $params['reid'] = $p['r'];
                return $this->oauth->post($url, $params);
                break;
            default:
                if(! empty($p['p']))
                {
                    $url = self::OPEN_HOST . '/api/t/add_pic?f=1';
                    $params['pic'] = $p['p'];
                    return $this->oauth->post($url, $params, true);
                }
                else
                    if(! empty($p['audio']))
                    {
                        $url = self::OPEN_HOST . '/api/t/add_music?f=1';
                        $params['url'] = $p['audio']['url'];
                        $params['title'] = $p['audio']['title'];
                        $params['author'] = $p['audio']['author'];
                        return $this->oauth->post($url, $params, true);
                    }
                    else
                        if(! empty($p["video"]))
                        {
                            $url = self::OPEN_HOST . '/api/t/add_video?f=1';
                            $params['url'] = $p['video'];
                            return $this->oauth->post($url, $params, true);
                        }
                        else
                        {
                            $url = self::OPEN_HOST . '/api/t/add?f=1';
                            return $this->oauth->post($url, $params);
                        }
                break;
        }

    }

    /*
     *移除一條訊息
     * @p 陣列,內含以下:
     * @id 微網誌ID
     * @return array
     */
    public function delOne($p)
    {
        $url = self::OPEN_HOST . '/api/t/del?f=1';
        $params = array('format' => self::RETURN_FORMAT, 'id' => $p['id']);
        return $this->oauth->post($url, $params);
    }

    /*
     *取得轉播和評論訊息清單
     * @p 陣列,內含以下:
     * @reid 轉播或是對話根節點ID；
     * @f（根據dwTime），0：第一頁，1：向下翻頁，2向上翻頁；
     * @n 要傳回的記錄的條數(1-20)；
     * @tid TwitterId：起始id，用於結果查詢中的定位，上下翻頁時才有用；
     * @t 起始時間戳，上下翻頁時才有用，取第一頁時忽略；
     * @flag 標誌0 轉播清單，1評論清單 2 評論與轉播清單
     * @return array
     */
    public function getReplay($p)
    {
        $url = self::OPEN_HOST . '/api/t/re_list?f=1';
        $params = array('format' => self::RETURN_FORMAT, 'rootid' => $p['reid'], 'pageflag' => $p['f'],
        'reqnum' => $p['n'], 'flag' => $p['flag']);
        if(isset($p['t']))
        {
            $params['pagetime'] = $p['t'];
        }
        if(isset($p['tid']))
        {
            $params['twitterid'] = $p['tid'];
        }
        return $this->oauth->get($url, $params);
    }

    /*
     *取得目前使用者的訊息
     * @p 陣列,內含以下:
     * @n:使用者名稱 空表示本人
     * @return array
     */
    public function getUserInfo($p = false)
    {
        if(! $p || ! $p['n'])
        {
            $url = self::OPEN_HOST . '/api/user/info?f=1';
            $params = array('format' => self::RETURN_FORMAT);
        }
        else
        {
            $url = self::OPEN_HOST . '/api/user/other_info?f=1';
            $params = array('format' => self::RETURN_FORMAT, 'name' => $p['n']);
        }
        return $this->oauth->get($url, $params);
    }

    /*
     *取得一批使用者的訊息
	 *
	 * @params array $users 帳號陣列
     * @return array
     */
    public function getUserInfos($users)
    {
        $url = self::OPEN_HOST . '/api/user/infos?f=1';
        is_array($users) && $users = implode(',', $users);
        $params = array('format' => self::RETURN_FORMAT, 'names' =>$users );
        return $this->oauth->get($url, $params);
    }

    /*
     *更新使用者資料
     * @p 陣列,內含以下:
     * @nick: 暱稱
     * @sex: 性別 0 ，1：男2：女
     * @year:出生年 1900-2010
     * @month:出生月 1-12
     * @day:出生日 1-31
     * @countrycode:國家碼
     * @provincecode:地區碼
     * @citycode:城市 碼
     * @introduction: 個人介紹
     * @return array
     */
    public function updateMyinfo($p)
    {
        $url = self::OPEN_HOST . '/api/user/update?f=1';
        $p['format'] = self::RETURN_FORMAT;
        return $this->oauth->post($url, $p);
    }

    /*
     *更新使用者圖示
     * @p 陣列,內含以下:
     * @Pic:檔案域表單名 本字段不能放入到簽名串中
     * @return array
     ******************/
    public function updateUserHead($p)
    {
        $url = self::OPEN_HOST . '/api/user/update_head?f=1';
        $p['format'] = self::RETURN_FORMAT;
        return $this->oauth->post($url, $p, true);
    }

    /*
     *取得聽眾清單/偶像清單
     * @p 陣列,內含以下:
     * @num: 請求個數(1-30)
     * @start: 起始位置
     * @n:使用者名稱 空表示本人
     * @type: 0 聽眾 1 偶像
     * @return array
     */
    public function getMyfans($p)
    {
        try
        {
            if($p['n'] == '')
            {
                $p['type'] ? $url = self::OPEN_HOST . '/api/friends/idollist' : $url = self::OPEN_HOST .
                 '/api/friends/fanslist';
            }
            else
            {
                $p['type'] ? $url = self::OPEN_HOST . '/api/friends/user_idollist' : $url = self::OPEN_HOST .
                 '/api/friends/user_fanslist';
            }
            $params = array('format' => self::RETURN_FORMAT, 'name' => $p['n'], 'reqnum' => $p['num'],
            'startindex' => $p['start']);
            return $this->oauth->get($url, $params);
        }
        catch(Core_Exception $e)
        {
            $ret = array("ret" => 0, "msg" => "ok",
            "data" => array("timestamp" => 0, "hasnext" => 1, "info" => array()));
            return $ret;
        }
    }

    /*
     *收聽/取消收聽某人
     * @p 陣列,內含以下:
     * @n: 使用者名稱
     * @type: 0 取消收聽,1 收聽 ,2 特別收聽
     * @return array
     */
    public function setMyidol($p)
    {
        switch($p['type'])
        {
            case 0:
                $url = self::OPEN_HOST . '/api/friends/del?f=1';
                break;
            case 1:
                $url = self::OPEN_HOST . '/api/friends/add?f=1';
                break;
            case 2:
                $url = self::OPEN_HOST . '/api/friends/addspecail?f=1';
                break;
        }
        $params = array('format' => self::RETURN_FORMAT, 'name' => $p['n']);
        return $this->oauth->post($url, $params);
    }

    /*
     *檢驗是否我粉絲或偶像
     * @p 陣列,內含以下:
     * @n: 其他人的帳戶名清單（最多30個,逗點分隔）
     * @type:   0 檢驗聽眾，1檢驗收聽的人 2 兩種關系都檢驗
     * @return array
     */
    public function checkFriend($p)
    {
        $url = self::OPEN_HOST . '/api/friends/check';
        $params = array('format' => self::RETURN_FORMAT, 'names' => $p['n'], 'flag' => $p['type']);
        return $this->oauth->get($url, $params);
    }

    /*
     *發私信
     * @p 陣列,內含以下:
     * @c: 微網誌內容
     * @ip: 使用者IP(以分析使用者所在地)
     * @j: 經度（可以填空）
     * @w: 緯度（可以填空）
     * @n: 接收方微網誌帳號
     * @return array
     */
    public function postOneMail($p)
    {
        $url = self::OPEN_HOST . '/api/private/add?f=1';
        $params = array('format' => self::RETURN_FORMAT, 'content' => $p['c'], 'clientip' => $p['ip'],
        'jing' => $p['j'], 'wei' => $p['w'], 'name' => $p['n']);
        return $this->oauth->post($url, $params);
    }

    /*
     *移除一封私信
     * @p 陣列,內含以下:
     * @id: 微網誌ID
     * @return array
     */
    public function delOneMail($p)
    {
        $url = self::OPEN_HOST . '/api/private/del?f=1';
        $params = array('format' => self::RETURN_FORMAT, 'id' => $p['id']);
        return $this->oauth->post($url, $params);
    }

    /*
     *私信收件箱和發件箱
     * @p 陣列,內含以下:
     * @f 分頁標誌（0：第一頁，1：向下翻頁，2向上翻頁）
     * @t: 本頁起始時間（第一頁 0，繼續：根據傳回記錄時間決定）
     * @n: 每次請求記錄的條數（1-20條）
     * @type : 0 發件箱 1 收件箱
     * @return array
     */
    public function getMailBox($p)
    {
        if($p['type'])
        {
            $url = self::OPEN_HOST . '/api/private/recv?f=1';
        }
        else
        {
            $url = self::OPEN_HOST . '/api/private/send?f=1';
        }
        $params = array('format' => self::RETURN_FORMAT, 'pageflag' => $p['f'], 'pagetime' => $p['t'],
        'reqnum' => $p['n'], 'lastid' => $p['l']);
        return $this->oauth->get($url, $params);
    }

    /*
     *搜尋
     * @p 陣列,內含以下:
     * @k:搜尋關鍵字
     * @n: 每頁大小
     * @p: 頁碼
     * @type : 0 使用者 1 訊息 2 話題 3tag
     * @return array
     */
    public function getSearch($p)
    {
        switch($p['type'])
        {
            case 0:
                $url = self::OPEN_HOST . '/api/search/user?f=1';
                break;
            case 1:
                $url = self::OPEN_HOST . '/api/search/t?f=1';
                break;
            case 2:
                $url = self::OPEN_HOST . '/api/search/ht?f=1';
                break;
            case 3:
                $url = self::OPEN_HOST . '/api/search/userbytag?f=1';
                break;
            default:
                $url = self::OPEN_HOST . '/api/search/t?f=1';
                break;
        }

        $params = array('format' => self::RETURN_FORMAT, 'keyword' => $p['k'], 'pagesize' => $p['n'], 'page' => $p['p']);
        return $this->oauth->get($url, $params);
    }

    /*
     *熱門話題
     * @p 陣列,內含以下:
     * @type: 請求型態 1 話題名，2 搜尋關鍵字 3 兩種型態都有
     * @n: 請求個數（最多20）
     * @pos :請求位置，第一次請求時填0，繼續填上次傳回的POS
     * @return array
     */
    public function getHotTopic($p)
    {
        $url = self::OPEN_HOST . '/api/trends/ht?f=1';
        if($p['type'] < 1 || $p['type'] > 3)
        {
            $p['type'] = 1;
        }
        $params = array('format' => self::RETURN_FORMAT, 'type' => $p['type'], 'reqnum' => $p['n'], 'pos' => $p['pos']);
        return $this->oauth->get($url, $params);
    }

    /*
     *檢視資料更新條數
     * @p 陣列,內含以下:
     * @op :請求型態 0：只請求更新數，不清除更新數，1：請求更新數，並對更新數歸零
     * @type：5 首頁未讀訊息記數，6 @頁訊息記數 7 私信頁訊息計數 8 新增粉絲數 9 首頁廣播數（原創的）
     * @return array
     */
    public function getUpdate($p)
    {
        $url = self::OPEN_HOST . '/api/info/update?f=1';
        if(isset($p['type']))
        {
            if($p['op'])
            {
                $params = array('format' => self::RETURN_FORMAT, 'op' => $p['op'], 'type' => $p['type']);
            }
            else
            {
                $params = array('format' => self::RETURN_FORMAT, 'op' => $p['op']);
            }
        }
        else
        {
            $params = array('format' => self::RETURN_FORMAT, 'op' => $p['op']);
        }
        return $this->oauth->get($url, $params);
    }

    /*
     *加入/移除 收藏的微網誌
     * @p 陣列,內含以下:
     * @id : 微網誌id
     * @type：1 加入 0 移除
     * @return array
     */
    public function postFavMsg($p)
    {
        if($p['type'])
        {
            $url = self::OPEN_HOST . '/api/fav/addt?f=1';
        }
        else
        {
            $url = self::OPEN_HOST . '/api/fav/delt?f=1';
        }
        $params = array('format' => self::RETURN_FORMAT, 'id' => $p['id']);
        return $this->oauth->post($url, $params);
    }

    /*
     *加入/移除 收藏的話題
     * @p 陣列,內含以下:
     * @id : 微網誌id
     * @type：1 加入 0 移除
     * @return array
     */
    public function postFavTopic($p)
    {
        if($p['type'])
        {
            $url = self::OPEN_HOST . '/api/fav/addht?f=1';
        }
        else
        {
            $url = self::OPEN_HOST . '/api/fav/delht?f=1';
        }
        $params = array('format' => self::RETURN_FORMAT, 'id' => $p['id']);
        return $this->oauth->post($url, $params);
    }

    /*
     *取得收藏的內容
     * @p 陣列,內含以下:
     * @Format: 傳回資料的格式 是（json或xml）
     *******話題
	n:請求數，最多15
	f:翻頁標誌  0：首頁   1：向下翻頁 2：向上翻頁
	t:翻頁時間戳0
	l:翻頁話題ID，第次請求時為0
     *******訊息
	f 分頁標誌（0：第一頁，1：向下翻頁，2向上翻頁）
	t: 本頁起始時間（第一頁 0，繼續：根據傳回記錄時間決定）
	n: 每次請求記錄的條數（1-20條）
     * @type 0 收藏的訊息  1 收藏的話題
     * @return array
     */
    public function getFav($p)
    {
        if($p['type'])
        {
            $url = self::OPEN_HOST . '/api/fav/list_ht?f=1';
            $params = array('format' => self::RETURN_FORMAT, 'reqnum' => $p['n'], 'pageflag' => $p['f'],
            'pagetime' => $p['t'], 'lastid' => $p['l']);
        }
        else
        {
            $url = self::OPEN_HOST . '/api/fav/list_t?f=1';
            $params = array('format' => self::RETURN_FORMAT, 'reqnum' => $p['n'], 'pageflag' => $p['f'],
            'pagetime' => $p['t'], 'lastid' => $p['l']);
        }
        return $this->oauth->get($url, $params);
    }

    /*
     *取得話題id
     * @p 陣列,內含以下:
     * @list: 話題名字清單（abc,efg,）
     * @return array
     */
    public function getTopicId($p)
    {
        $url = self::OPEN_HOST . '/api/ht/ids?f=1';
        $params = array('format' => self::RETURN_FORMAT, 'httexts' => $p['list']);
        return $this->oauth->get($url, $params);
    }

    /*
     *取得話題內容
     * @p 陣列,內含以下:
     * @list: 話題id清單（abc,efg,）
     * @return array
     */
    public function getTopicList($p)
    {
        $url = self::OPEN_HOST . '/api/ht/info?f=1';
        $params = array('format' => self::RETURN_FORMAT, 'ids' => $p['list']);
        return $this->oauth->get($url, $params);
    }

    /*
     *增加tag
     * @p 陣列,內含以下:
     * @tag: tag 名稱n
     * @return array
     */
    public function addTag($p)
    {
        $url = self::OPEN_HOST . '/api/tag/add';
        $params = array('format' => self::RETURN_FORMAT, 'tag' => $p['n']);
        return $this->oauth->post($url, $params);
    }

    /*
     *移除tag
     * @p 陣列,內含以下:
     * @tag: tag的id
     * @return array
     */
    public function delTag($p)
    {
        $url = self::OPEN_HOST . '/api/tag/del';
        $params = array('format' => self::RETURN_FORMAT, 'tagid' => $p['id']);
        return $this->oauth->post($url, $params);
    }

    /*
     *取得視訊訊息
     * @p 陣列,內含以下:
     * @format: 傳回資料的格式
     * @url: 視訊位址
     * @return  json或xml
     */
    public function getVideoInfo($p)
    {
        $url = self::OPEN_HOST . '/api/t/getvideoinfo';
        $params = array('format' => 'string', 'url' => $p['url']);
        return $this->oauth->post($url, $params);
    }

    /*
     *取得視訊訊息
     * @p 陣列,內含以下:
     * @format: 傳回資料的格式
     * @url: 視訊位址
     * @return  json或xml
     */
    public function getUrlFull($p)
    {
        $url = self::OPEN_HOST . '/api/t/getvideoinfo';
        $params = array('format' => 'string', 'url' => $p['url']);
        return $this->oauth->post($url, $params);
    }

    /*
     *根據微網誌id批次取得微網誌內容（與索引結合起來用）
     * @p 陣列,內含以下:
     * @format: 傳回資料的格式
     * @ids:array || string
     * @return  json或xml
     */
    public function getTlineFromIds($p)
    {
        $url = self::OPEN_HOST . '/api/t/list';
        if(is_array($p['ids']) && $p['ids'])
        {
            $p['ids'] = implode(',', $p['ids']);
        }
        $params = array('format' => self::RETURN_FORMAT, 'ids' => $p['ids']);
        return $this->oauth->get($url, $params);
    }

    /*
     *取得我的粉絲清單，簡單訊息
     * @p 陣列,內含以下:
     * @format: 傳回資料的格式
     * @reqnum: 請求個數(1-200)
     * @Startindex: 起始位置（第一頁填0，繼續向下翻頁：reqnum*（page-1））
     * @return  json或xml
     */
    public function getFansShortList($p)
    {
        $url = self::OPEN_HOST . '/api/friends/fanslist_s';
        $params = array('format' => self::RETURN_FORMAT, 'reqnum' => $p['reqnum'], 'startindex' => $p['startindex']);
        return $this->oauth->get($url, $params);
    }

        /*
     *取得我的粉絲清單，簡單訊息
     * @p 陣列,內含以下:
     * @format: 傳回資料的格式
     * @reqnum: 請求個數(1-200)
     * @Startindex: 起始位置（第一頁填0，繼續向下翻頁：reqnum*（page-1））
     * @return  json或xml
     */
    public function getIdolShortList($p)
    {
        $url = self::OPEN_HOST . '/api/friends/idollist_s';
        $params = array('format' => self::RETURN_FORMAT, 'reqnum' => $p['reqnum'], 'startindex' => $p['startindex']);
        return $this->oauth->get($url, $params);
    }

			/*
	 * 測試呼叫public_timeline是否成功
	 * @p 陣列，內含以下：
     * @p 記錄的起始位置（第一次請求是填0，繼續請求進填上次傳回的Pos）
     * @n 每次請求記錄的條數（1-20條）
     * @return 0:正確；其他，錯誤
	 */
	public function testPublic($p)	
	{
		$url = self::OPEN_HOST . '/api/statuses/public_timeline?f=1';
        $params = array('format' => self::RETURN_FORMAT, 'pos' => $p['p'], 'reqnum' => $p['n']);
        return $this->oauth->testApi($url, $params);
	}
}
?>
