<?php

$alpha = array( 'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z');

$data = array();

$count = 0;
foreach ($alpha as $item) {
	for ($i = 0; $i < 20; $i++) {
		$data[$item][] = array(
			'id'=>$count,
			'name'=>$item . '-' . $i,
		);
		$count ++;
	}
}

$type = $_GET['type'];
switch ($type) {
	case 'alphas':
		echo json_encode($alpha);
		break;
	
	default:
		// code...
		break;
}
/* $letter = strtolower($_GET['alpha']);
[>$pageSize = intval($_GET['size']);
$pageNum = intval($_GET['page']);<]
echo json_encode($data[$letter]); */
die();
//End of file 
