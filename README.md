chatapp-nodesocketmysql
=======================

This is the simple app which does simple chat with anonymous users 
$timenow = '09:00';
$fattorino_arr = array('01:00|01:30','01:30|02:00','02:00|02:30');
$schedulesarr = array('01:00|01:30','01:30|02:00','02:00|02:30','02.30|03:00','03:00|03:30','03:30|04:00','04:00|04:30','04:30|05:00','05:00|05:30','05:30|06:00','06:00|06:30','06:30|07:00','07:00|07:30','07:30|08:00','08:00|08:30','08:30|09:00','09:00|09:30','09:30|10:00','11:00|11:30','11:30|12:00','12:00|12:30','12.30|13:00','13:00|13:30','13:30|14:00','14:00|14:30','14:30|15:00','15:00|15:30','15:30|16:00','16:00|16:30','16:30|17:00','17:00|17:30','17:30|18:00','18:00|18:30','18:30|19:00','19:00|19:30','19:30|20:00','21:00|21:30','21:30|22:00','22:00|22:30','22.30|23:00','23:00|23:30','23:30|24:00');

$need_matcharr = array();
$need_nomatcharr = array();
foreach ($schedulesarr as $schedule){
    $expl = explode('|', $schedule);
    if( (strtotime($expl[0]) <= strtotime($timenow) || strtotime($expl[0]) > strtotime($timenow))  &&  strtotime($expl[1]) > strtotime($timenow) ){
        $need_matcharr[] = $schedule;
    }else{
        $need_nomatcharr[] = $schedule;
    }
   
}
$neededArr =  array_merge($need_matcharr,$need_nomatcharr);
echo '<pre>';
print_r($neededArr);
echo '</pre>';
