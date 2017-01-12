<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>All picture quotes</title>
		<link rel="stylesheet" href="css/style.css">
	</head>
	<body>
		<?php $thumbs = glob("uploads/*.{jpg,png,gif}", GLOB_BRACE); ?>
	    <?php
	    if(count($thumbs)) {
	      natcasesort($thumbs);
	      foreach($thumbs as $thumb) {
	      ?>
	      <div class="picture_saved">
	      	<img src="<?php echo $thumb ?>" alt="">
	      </div>
	    <?php
	        }} else {
	          echo "Sorry, no images to display!";
	        }
	    ?>
	</body>
</html>
