
<html>
<head>
    <title>Create Idea</title>
</head>
<body>
Create Idea Here
<#if idea??>
<h2>New Idea Created<br></h2>
</#if>
<form action="" method="post">
    <select name="sectionId" id="">
        <option value="1">s1</option>
        <option value="2">s2</option>
        <option value="3">s3</option>
    </select>
    <textarea name="ideaText" id="" cols="30" rows="10"></textarea>
    <input type="submit">
</form>
</body>
</html>