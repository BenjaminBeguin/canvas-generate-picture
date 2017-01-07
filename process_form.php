<?php

    $imageData = $_POST['dt'];

	   

		define('UPLOAD_DIR', 'uploads/');
		$img = $imageData;
		$img = str_replace('data:image/png;base64,', '', $img);
		$img = str_replace('data:image/jpeg;base64,', '', $img);
		$img = str_replace(' ', '+', $img);

		var_dump($img);
		$data = base64_decode($img);
		$file = UPLOAD_DIR . uniqid() . '.png';
		$success = file_put_contents($file, $data);
		print $success ? $file : 'Unable to save the file.';
 
?>