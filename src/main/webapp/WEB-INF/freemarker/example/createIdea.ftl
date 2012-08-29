<#import "/spring.ftl" as spring />

<!DOCTYPE html>
<html>
<head>
    <title>Contribute Idea</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="stylesheet" href="<@spring.url '/static/css/bootstrap.css'/>"/>
    <link rel="stylesheet" href="<@spring.url '/static/css/mib_custom.css'/>"/>
</head>
<body>
<div class="mib_header">
    <h1><span class="lightbulb-icon"></span>New Idea</h1>
</div>
<div class="mib_content">

<#if idea??>
    <div class="alert alert-success">
        Your idea has been posted
    </div>
</#if>
<#if ideaForm?? >
    <#if !ideaForm.isValid() >
        <div class="alert alert-error">
        ${ideaForm.getAlert()}
        </div>
    </#if>
</#if>

    <form name="ideaForm" action="" method="post" class="addStickyForm">
        <p>
            <input type="text" placeholder="board URL" value="http://10.10.15.130:3000/for/mibTest/9"/>
        </p>
        <p>
            <label for="sectionId">Add Idea to:</label>
            <select name="sectionId" id="sectionId">
                <option value="20" selected="selected">Section ID #20</option>
            </select>
        </p>
        <div class="sticky largeSticky">
            <textarea name="ideaText" id="ideaText"></textarea>
        </div>
        <div class="form_action">
            <button id="resetBtn" type="reset" class="btn btn-large">Discard</button>
            <button id="submitBtn" type="button" class="btn btn-large btn-success btn-primary">Submit Idea</button>
        </div>
    </form>
</div>
</body>
<script src="<@spring.url '/static/lib/zepto.min.js'/>"></script>
<script src="<@spring.url '/static/javascript/mobile_idea_boardz.js'/>"></script>
<script src="<@spring.url '/static/javascript/web_idea_boardz.js'/>"></script>
<script src="<@spring.url '/static/javascript/idea_creation_binding.js'/>"></script>
</html>