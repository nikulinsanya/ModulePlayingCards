<?php
// $id = $keyINsock
echo "\r\n\r\n users.class.php included \r\n\r\n";
require_once(dirname(__FILE__).'/cards.class.php');

class Users{
  public $exists = 'true';
  private $names = array(); // $Arr[name] = id
  private $opponents = array(); // $Arr[name] = opponentName
  private $cMotion = array(); // $Arr[name] = opponentName

  public function __construct(){ }
  private function log($msg){
    echo "\r\n\r\n log: ".$msg."\r\n\r\n";
  }
  private function printr($var){
    echo "\r\n\r\n";
    print_r($var);
    echo "\r\n\r\n";
  }
  private function getName($id){
    return array_search($id,$this->names);
  }
  private function send($idSock, $function, $args = ''){
      $arrOut = array('function' => $function, 'args' => $args);
      $arrOutJSON = json_encode($arrOut);
      websock_send($idSock, $arrOutJSON);
  }
  public function loginQuery($myId, $login){
    if ((strlen($login) > 3) && !isset($this->names[$login])) {
      $this->names[$login] = $myId;
      $this->send($myId, 'loginSuccess', $login);
      return;
    }
    $this->send($myId, 'loginFailed', 'Логин некорректный или занят');
  }
  public function getUsers($myId){
    $myName = $this->getName($myId);
    $this->send($myId, 'setUserList', $this->names);
    foreach ($this->names as $uId){
      if ($uId == $myId) continue;
      $this->send($uId, 'plusUser', $myName);
    }
  }
  public function figthRequest($myId, $opponentLogin){
    $myName = $this->getName($myId);
    $this->opponents[$myName] = $opponentLogin;
    $opId = $this->names[$opponentLogin];
    $this->send($myId, 'waitResponse', $opponentLogin);
    $this->send($opId, 'requestToMe', $myName);
  }
  public function disconnect($uId){
    $uName = $this->getName($uId);
    unset($this->names[$uName]);
  }
  public function modalClose($myId){
    $myName = $this->getName($myId);
    $opponentLogin = $this->getOpponent($myName);
    $opId = $this->names[$opponentLogin];
    $this->send($opId, 'modalClose');
  }
  public function getOpponent($login){
    $opLog = $this->opponents[$login];
    if (!empty($opLog)) return $opLog;
    return array_search($login,$this->opponents);
  }
  public function removeOpponent($login){
    unset($this->opponents[$login]);
    $e = array_search($login,$this->opponents);
    unset($this->opponents[$e]);
  }
  public function fightAccepted($myId){
    $this->log('!!!! fightAcceptedBy: '.$myId);

    $myName = $this->getName($myId);
    $opLog = $this->getOpponent($myName);
    $opId = $this->names[$opLog];
    $this->send($myId, 'fightAccepted');
    $this->send($opId, 'fightAccepted');

    $this->setMotionOrder($myId);
  }
  public function setMotionOrder($myId){
    $this->log('!!!! setMotionOrderBy: '.$myId);

    $myName = $this->getName($myId);
    $opLog = $this->getOpponent($myName);
    $names = array();
    $names[] = $myName;
    $names[] = $opLog;
    $first = $names[round(rand(0,1))];
    $this->cMotion[$myName] = $first;
    $this->cMotion[$opLog] = $first;
  }
  public function reConnect($myId, $login){
    $this->names[$login] = $myId;
    $this->send($myId, 'reconnected');
  }
  public function getRandomMotion($myId){
    $myName = $this->getName($myId);
    $opLog = $this->getOpponent($myName);
    $opId = $this->names[$opLog];

    $this->log('getRandomMotion:');
    $this->printr($this->cMotion);

    $first = $this->cMotion[$myName];
    $this->send($myId, 'setMotion',$first);
  }
  public function reMotion($myId){
    $this->log('reMotion BY: '.$myId);

    $myName = $this->getName($myId);
    $opLog = $this->getOpponent($myName);
    $opId = $this->names[$opLog];

    $this->cMotion[$myName] = $opLog;
    $this->cMotion[$opLog] = $opLog;
    $cur = $opLog;

    $this->send($myId, 'setMotion', $cur);
    $this->send($opId, 'setMotion', $cur);
  }
  public function plusCard($myId){
    global $Cards;
    $myName = $this->getName($myId);
    $opLog = $this->getOpponent($myName);
    $opId = $this->names[$opLog];

    $card = $Cards->getRandom();

    $this->send($myId, 'cardToHand', $card);
    $this->send($opId, 'cardToOp');
  }
  public function putCard($myId,$cardJSON){
    $myName = $this->getName($myId);
    $opLog = $this->getOpponent($myName);
    $opId = $this->names[$opLog];
    $this->send($opId, 'opPutCard', $cardJSON);
  }
  private function getOpponentId($myId){
    $myName = $this->getName($myId);
    $opLog = $this->getOpponent($myName);
    $opId = $this->names[$opLog];
    return $opId;
  }
  public function attacking($myId,$data){
    $opId = $this->getOpponentId($myId);
    $this->send($opId, 'showAttack', $data);
  }











} 





























$Users = new Users();
?>