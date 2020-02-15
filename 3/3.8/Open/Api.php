<?php
/**
 * iweibo2.0
 * 
 * 開放平台API
 *
 * @author echoyang 
 * @link http://open.t.qq.com/iweibo
 * @copyright Copyright c 1998-2011. All Rights Reserved 
 * @license http://open.t.qq.com/iweibo/license
 * @version $Id: Core_Open_Api.php 2011-06-09 10:16:00Z gionouyang $
 * @package Core
 * @since 2.0
 */
class Core_Open_Api
{
    private static $apiClient;
    private static $adminClient;
    private static $noneTokenClient;

    /**
     * 取得API呼叫的用戶端
     * @return Core_Open_Client
     */
    public static function getClient()
    {
        if(isset(self::$apiClient))
        {
            return self::$apiClient;
        }
        
        $token['access_token'] = $_SESSION['access_token'];
        $token['access_token_secret'] = $_SESSION['access_token_secret'];
        $token['name'] = $_SESSION['name'];
        
        //必須要取得存取授權先
        if(empty($token))
        {
            Core_Fun::error('必須要取得存取授權', 101);
        }
        
        //取得安裝時候的key
        $akey = Core_Config::get('appkey', 'basic');
        $skey = Core_Config::get('appsecret', 'basic');
        
        if(empty($akey) || empty($skey))
        {
            Core_Fun::error('key遺失', 102);
        }
        self::$apiClient = new Core_Open_Client($akey, $skey, $token['access_token'], $token['access_token_secret']);
        
        return self::$apiClient;
    }

    /**
     * 類比管理員的身份建立一個用戶端
     * @return Core_Open_Client
     */
    public static function getAdminClient($admin_info)
    {
        if(isset(self::$adminClient))
        {
            return self::$adminClient;
        }
        $token['access_token'] = $admin_info['access_token'];
        $token['access_token_secret'] = $admin_info['access_token_secret'];
        //取得安裝時候的key
		$akey = $admin_info['appkey'];
        $skey = $admin_info['appsecret'];

        if(empty($akey) || empty($skey))
        {
            return FALSE;
        }
        self::$adminClient = new Core_Open_Client($akey, $skey, $token['access_token'], $token['access_token_secret']);

        return self::$adminClient;
    }

    /**
     * 取得API呼叫的用戶端，無需token
     * @return Core_Open_Client
     */
    public static function getNoneTokenClient()
    {
        if(isset(self::$noneTokenClient))
        {
            return self::$noneTokenClient;
        }
        //取得安裝時候的key
        $akey = Core_Config::get('appkey', 'basic');
        $skey = Core_Config::get('appsecret', 'basic');
        
        if(empty($akey) || empty($skey))
        {
            Core_Fun::error('key遺失', 102);
        }
        self::$noneTokenClient = new Core_Open_Client($akey, $skey);

        return self::$noneTokenClient;
    }
}