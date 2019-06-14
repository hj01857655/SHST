<?php
namespace app\auxiliary;

class Http
{

    public static function httpRequest($url, $data=array(), $method='GET',
        $headers = array('User-Agent: Mozilla/5.0 (Linux; U; Mobile; Android 6.0.1;C107-9 Build/FRF91 )') , $cookieFlag = false) {
        $curl = curl_init();  // 启动一个CURL会话
        if (count($headers) >= 1) curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
        if($method=='GET'){
            $url = $url."?".Http::arrstr($data);
        }
        curl_setopt($curl, CURLOPT_URL, $url);  // 要访问的地址
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);  // 对认证证书来源的检查
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 2);  // 从证书中检查SSL加密算法是否存在
        //curl_setopt($curl, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']);  // 模拟用户使用的浏览器
        curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1); // 使用自动跳转 
        curl_setopt($curl, CURLOPT_AUTOREFERER, 1);  // 自动设置Referer
        if($method=='POST'){
            curl_setopt($curl, CURLOPT_POST, 1); // 发送一个常规的Post请求
            if ($data != '')  curl_setopt($curl, CURLOPT_POSTFIELDS, $data);  // Post提交的数据包
        }
        curl_setopt($curl, CURLOPT_TIMEOUT, 5);  // 设置超时限制防止死循环
        if($cookieFlag) curl_setopt($curl, CURLOPT_HEADER, 2);  // 显示返回的Header区域内容
        else curl_setopt($curl, CURLOPT_HEADER, 0);  // 显示返回的Header区域内容
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);   // 获取的信息以文件流的形式返回
        $result = curl_exec($curl);    //执行操作
        // if (curl_errno($curl)) echo 'Errno:'.curl_error($curl);//捕抓异常
        if(!$cookieFlag){
            curl_close($curl); 
            return $result;
        }else{
          if (curl_getinfo($curl, CURLINFO_HTTP_CODE) == '200') {
              $responseHeader_size  = curl_getinfo($curl, CURLINFO_HEADER_SIZE);
              $responseHeaders  = substr($result, 0, $responseHeader_size);
              $responseBody   = substr($result, $responseHeader_size);
              // var_dump($responseHeaders);
              // var_dump($responseBody);
              curl_close($curl); 
              return [$responseBody,$responseHeaders];
          }else {
              curl_close($curl); 
              return [false,""];
          }
        } 
      }

      private static function arrstr($arr){
          $ret = "";
          reset($arr);
          while (list($k, $v) = each($arr)){
              $tmp = "$k"."="."$v";
              $ret = $ret."&".$tmp;
          }
          return $ret;
      }


}
