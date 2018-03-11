<?php


$app->post('/uploadMe', function() use ($app) {
    require_once 'config.php';
    $r = json_decode($app->request->getBody());
    $response = array();
    $postData  = $r->postData;
    // $response['reponseList'] =   $imgList;

    $parent_dir="./labreports/";
    
    $billidh = $postData->lbillidh;
    $lbillidd = $postData->lbillidd;
    $lbptype = $postData->lbptype;
    $newtrid = $postData->newtrid;

    $pty_dir = $parent_dir.$lbptype;
    $bilh_dir =  $pty_dir .'/'.$billidh;
    $bildt_dir =  $bilh_dir .'/'.$lbillidd;

    //Check if the directory already exists.
    if(!is_dir($pty_dir)){
         mkdir($pty_dir, 0755, true);
    }
    if(!is_dir($bilh_dir)){
        mkdir($bilh_dir, 0755, true);
    }

    if(!is_dir($bildt_dir)){
        mkdir($bildt_dir, 0755, true);
    }




    $imglist =  $postData->imgList;
    foreach($imglist as $imgs){
        $img = $imgs->imgUrl;
        $img = str_replace('data:image/jpeg;base64,', '', $img);
        $img = str_replace(' ', '+', $img);
        $data = base64_decode($img);
        $file = $bildt_dir.'/' . uniqid() . '.jpg';

        $success = file_put_contents($file, $data);
if($success){
    $response['status'] = "Success";
    $response['ptype'] = $pty_dir;
    $response['billidh'] = $bilh_dir;
    $response['Last_DIR'] = $bildt_dir;
}else{
    $response['status'] = "Error";
    $response['ptype'] = $pty_dir;
    $response['billidh'] = $bilh_dir;
    $response['Last_DIR'] = $bildt_dir;
}
    }
    
    echoResponse(200,  $response);


});
?>