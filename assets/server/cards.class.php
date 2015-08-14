<?php
echo "\r\n\r\n cards.class.php included\r\n\r\n";
class cards{ 
    public $cards = array();
    public $cardsIndex = array();

	public function __construct(){
		echo "\r\n\r\n cards __construct()\r\n\r\n ";
		$this->cards[] = array(
			"name" => 'zealot',
			"title" => 'Зилот',
			"attack" => 2,
			"health" => 2,
			"mana" => 1,
			"picture" => 'zealot.jpg'
			);
		$this->cards[] = array(
			"name" => 'stalker',
			"title" => 'Сталкер',
			"attack" => 3,
			"health" => 2,
			"mana" => 1,
			"picture" => 'stalker.jpg'
			);
		$this->cards[] = array(
			"name" => 'koloss',
			"title" => 'Колосс',
			"attack" => 4,
			"health" => 2,
			"mana" => 2,
			"picture" => 'koloss2.jpg'
			);
		$this->cards[] = array(
			"name" => 'river',
			"title" => 'Ривер',
			"attack" => 6,
			"health" => 2,
			"mana" => 2,
			"picture" => 'river.jpg'
			);
		$this->cards[] = array(
			"name" => 'probe',
			"title" => 'Проба',
			"attack" => 1,
			"health" => 1,
			"mana" => 1,
			"picture" => 'probe.jpg'
			);
		$this->cards[] = array(
			"name" => 'fenix',
			"title" => 'Феникс',
			"attack" => 2,
			"health" => 2,
			"mana" => 1,
			"picture" => 'fenix.jpg'
			);
	}
	public function getRandom(){
		$index = rand(0,count($this->cards)-1);
		$card = $this->cards[$index];
		return $card;
	}
}


























$Cards = new cards();
?>
