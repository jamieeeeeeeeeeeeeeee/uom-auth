import { v4 as uuidv4 } from "uuid";

const cstickets = [];
const TICKET_EXPIRY_TIME = 10 * 60 * 1000; // 10 minutes in milliseconds

function deleteExpiredCSTickets() {
  const now = Date.now();
  cstickets.filter(ticket => now - ticket.time <= TICKET_EXPIRY_TIME);
}

function csticketExists(csticket) {
  return cstickets.some(ticket => ticket.csticket === csticket);
}

export async function POST() {
  deleteExpiredCSTickets();
  
  let newCSTicket;
  do {
    newCSTicket = uuidv4();
  } while (csticketExists(newCSTicket));

  cstickets.push({
    csticket: newCSTicket,
    time: Date.now(),
  });

  return new Response(JSON.stringify({ csticket: newCSTicket }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function GET({ request }) {
  const url = new URL(request.url);
  const params = url.searchParams;

  if (!params.has("csticket") || !params.has("username")) {
    return new Response(JSON.stringify({ error: "Missing required parameters" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const csticket = params.get("csticket");
  const username = params.get("username");
  const fullname = params.get("fullname");

  deleteExpiredCSTickets();

  if (!csticketExists(csticket)) {
    return new Response(JSON.stringify({
      error: "Invalid or expired CSTicket. Please close the tab and try again.",
    }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const authParams = new URLSearchParams({
    url: "https://www.studentadmin-manchester.uk/signin",
    csticket,
    version: "3",
    command: "confirm",
    username,
    fullname,
  });

  try {
    const resp = await fetch(`http://studentnet.cs.manchester.ac.uk/authenticate/?${authParams}`);
    const result = await resp.text();

    if (result === "true") {
      // Create a simple HTML page to display the username
      const htmlContent = `
      <html class="pc chrome win psc_dir-ltr psc_mode-md psc_form-xlarge" dir="ltr" lang="en"><!-- Copyright (c) 2000, 2022, Oracle and/or its affiliates.  --><head>
    <style>
    @media (max-width: 768px) {
          #CUM_GPA$0_row_1 {display: none;}

    }</style><meta name="apple-mobile-web-app-capable" content="yes">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width,user-scalable=yes,initial-scale=1.0,minimum-scale=1.0">
    <script language="JavaScript">
        var totalTimeoutMilliseconds = 1200000;
        var warningTimeoutMilliseconds = 1080000;
        var timeOutURL = 'https://studentadmin.manchester.ac.uk/psp/CSPROD_4/EMPLOYEE/SA/?cmd=expire';
        var timeoutWarningPageURL = 'https://studentadmin.manchester.ac.uk/psc/CSPROD_4/EMPLOYEE/SA/s/WEBLIB_TIMEOUT.PT_TIMEOUTWARNING.FieldFormula.IScript_TIMEOUTWARNING';
        var sRCRequestURL = 'https://studentadmin.manchester.ac.uk/psc/CSPROD_4/EMPLOYEE/SA/s/WEBLIB_PTRC.ISCRIPT1.FieldFormula.IScript_RC_REQUEST';
    </script>
    <style>
        span {
            font-size: 14.67px;
        }
    </style>
    <link rel="apple-touch-icon" href="https://studentadmin.manchester.ac.uk/cs/CSPROD/cache/LOGO_FAVICON_1.png">
    <link rel="icon" href="/cs/CSPROD/cache/LOGO_FAVICON_1.png">
    <link rel="stylesheet" type="text/css" href="https://studentadmin.manchester.ac.uk/cs/CSPROD/cache/PSSTYLEDEF_FMODE_1.css">
    <link rel="stylesheet" type="text/css" href="https://studentadmin.manchester.ac.uk/cs/CSPROD/cache/PT_QAB_POPUP_CSS_1.css">
    <link rel="stylesheet" type="text/css" href="https://studentadmin.manchester.ac.uk/cs/CSPROD/cache/PTS_INTELLISCHCSS_1.css">
    <link rel="stylesheet" type="text/css" href="https://studentadmin.manchester.ac.uk/cs/CSPROD/cache/PTNUI_PINTO_CSS_1.css">
    <link rel="stylesheet" type="text/css" href="https://studentadmin.manchester.ac.uk/cs/CSPROD/cache/PTNUI_NAVBAR_CSS_1.css">
    <title>Academic Records</title>
    <script language="JavaScript">
        try {
        }
        catch (err) { ; }
    </script>
    <script language="JavaScript">
        var winName = 'win4';
        var winParent = null;
        var modalID = null;
        var modalZoomName = null;
        var baseKey_win4 = "\x1b";
        var altKey_win4 = "0J5678\xbc\xbe\xbf\xde34";
        var ctrlKey_win4 = "JK";
        var saveWarningKeys_win4 = "A3;A4;";
        var firstFocusID = null;
        var bPTDrag = false;
        var sMDWrapperStyle = '', sMDSide1Style = '', sMDSide2Style = '', sMDHeaderStyle = '', sMDFooterStyle = '', sPageFFStyle = '';
        var refererURL = 'https://studentadmin.manchester.ac.uk/psc/CSPROD/EMPLOYEE/SA/c/NUI_FRAMEWORK.PT_LANDINGPAGE.GBL';
        var isNewSaveWarn = true;
        var bAccessibility_win4 = false;
        var bFMode = true;
        var bDoModal_win4 = false;
        var bJSModal_win4 = false;
        var bPromptPage_win4 = false;
        var bTabOverTB_win4 = false;
        var bTabOverPg_win4 = false;
        var bTabOverNonPS_win4 = false;
        var strCurrUrl = 'https://studentadmin.manchester.ac.uk/psp/CSPROD_4/EMPLOYEE/SA/c/SSR_STUDENT_ACAD_REC_FL.SSR_MD_ACAD_REC_FL.GBL?PAGE=SCC_MD_TGT_PAGE_FL';
        var strReqURL = '';
        var bIncInNavigation = 'T';
        var szPinCrefID = 'CS_SSR_MD_ACAD_REC_FL_GBL';
        var szPinCrefReg = 'T';
        var szPinCrefLabel = 'Academic Records MD';
        var szCrefID = 'CS_SSR_MD_ACAD_REC_FL_GBL';
        var szCrefReged = 'T';
        var szCrefVisible = 'F';
        var szCrefLabel = 'Academic Records MD';
        var szCrefUsageType = 'TARG';
        var localNodes = ['PSFT_CS', 'SA'];
        var remoteUrls = ['https://studentadmin.manchester.ac.uk/psp/CSPROD/EMPLOYEE/ANONYMOUS', 'http://cs92upg003.manchester.com:8000/psp/ps/EMPLOYEE/PSFT_HR'];
        bGenDomInfo = false;
        var szCalendarType = 'G';
        var bMenuSrchPage = false;
        var bGuidedAG = false;
        var bWSRP = 0; var szMenuSrchText = "-999999-";
        var disablePNSubscriptions = 0; var modalBackUrl = '/cs/CSPROD/cache/PT_NUI_BACK_SMALL_IMG_1.svg';
        var modalBackAlt = 'Back';
        var sPopupTitle = 'Popup window';
        var modalCloseUrl = '/cs/CSPROD/cache/PT_MODAL_CLOSE_NUI_1.svg';
        var modalCloseAlt = 'Close';
        var modalResizeUrl = '/cs/CSPROD/cache/PT_RESIZE_IMG_1.svg';
        var modalResizeAlt = 'Drag to resize';
        var modalMoveAlt = 'Drag to move';
    </script>
    <script language="JavaScript">
        bPTActEnterKey = false;
    </script>
    <script language="JavaScript">
        var scrollFieldListOld = [['win4hdrdivPT_ACTION_MENUgrp', 1, 0, 0, 0, 0, 1, 0, 0, 1], ['win4hdrdivPT_CONTEXT_MENUgrp', 1, 0, 0, 0, 0, 1, 0, 0, 1]]; var scrollFieldList = [['win4hdrdivPT_ACTION_MENUgrp', 1, 0, 0, 0, 0, 1, 0, 0, 1], ['win4hdrdivPT_CONTEXT_MENUgrp', 1, 0, 0, 0, 0, 1, 0, 0, 1]];
    </script>
    <script language="JavaScript">
        var agGroupletList = []; var groupletList = []; agGroupletList = [['win4sidegroupletSCC_LO_FL_WRK_SCC_GROUP_BOX_5', '5', 'https://studentadmin.manchester.ac.uk/psc/CSPROD_newwin/EMPLOYEE/SA/c/SSR_STUDENT_ACAD_REC_FL.SSR_ACADREC_NAV_FL.GBL?Page=SCC_START_PAGE_FL&Action=U&scname=CS_SSR_ACADEMIC_RECORDS_FL&MD=Y&ICDoModal=1&ICGrouplet=1&ICLoc=1', '', '0', 'bGrouplet@1;', '', '0', '', '', '', '0', 'CS_SSR_ACADREC_NAV_FL_GBL']];
    </script>
    <script language="JavaScript">
        try {
            document.domain = "manchester.ac.uk";
        }
        catch (err) { ; }
    </script>
    <script language="JavaScript" type="text/javascript" src="https://studentadmin.manchester.ac.uk/cs/CSPROD/cache/PT_COMMON_FMODE_MIN_1.js">
    </script>
    <script language="JavaScript" type="text/javascript" src="https://studentadmin.manchester.ac.uk/cs/CSPROD/cache/PT_AJAX_NET_MIN_1.js">
    </script>
    <script language="JavaScript" type="text/javascript" src="https://studentadmin.manchester.ac.uk/cs/CSPROD/cache/PT_SAVEWARNINGSCRIPT_MIN_1.js">
    </script>
    <script language="JavaScript" type="text/javascript" src="https://studentadmin.manchester.ac.uk/cs/CSPROD/cache/PT_PAGESCRIPT_win4_MIN_1.js">
    </script>
    <script language="JavaScript" type="text/javascript" src="https://studentadmin.manchester.ac.uk/cs/CSPROD/cache/PT_EDITSCRIPT_win4_MIN_1.js">
    </script>
    <script language="JavaScript" type="text/javascript" src="https://studentadmin.manchester.ac.uk/cs/CSPROD/cache/PT_PAGESCRIPT_FMODE_MIN_1.js">
    </script>
    <script language="JavaScript" type="text/javascript" src="https://studentadmin.manchester.ac.uk/cs/CSPROD/cache/PT_TYPEAHEAD_win4_MIN_1.js">
    </script>
    <script language="JavaScript">
        DoUrlNUI();
        var nResubmit = 0;
        var nLastAction = 0;
        var loader = null;
        if (typeof (bCleanHtml) == 'undefined')
            var bCleanHtml = false;
        setupTimeout2();
        var postUrl_win4 = 'https://studentadmin.manchester.ac.uk/psc/CSPROD_4/EMPLOYEE/SA/c/SSR_STUDENT_ACAD_REC_FL.SSR_MD_ACAD_REC_FL.GBL';
        function aAction_win4(form, id, params, bAjax, bPrompt, sAjaxTrfUrl, bWarning, sScriptAfter, nTrfURLType) {
            setupTimeout2();
            if ((id != '#ICSave'))
                processing_win4(1, 3000);
            aAction0_win4(form, id, params, bAjax, bPrompt, sAjaxTrfUrl, bWarning, sScriptAfter, nTrfURLType);
        }
        function submitAction_win4(form, id, event, sAjaxTrfUrl, bWarning, sScriptAfter, nTrfURLType) {
            setupTimeout2();
            if (!ptCommonObj2.isICQryDownload(form, id)) { processing_win4(1, 3000); }
            preSubmitProcess_win4(form, id);
            var spellcheckpos = id.indexOf('$spellcheck');
            if ((spellcheckpos != -1) && (id.indexOf('#KEYA5') != -1))
                form.ICAction.value = id.substring(0, spellcheckpos);
            else
                form.ICAction.value = id;
            var actionName = form.ICAction.value;
            form.ICXPos.value = ptCommonObj2.getScrollX();
            form.ICYPos.value = ptCommonObj2.getScrollY();
            bcUpdater.storeBcDomData();
            if ((typeof (bAutoSave) != 'undefined') && bAutoSave)
                form.ICAutoSave.value = '1';
            if (!ptCommonObj2.isAJAXReq(form, id) && !ptCommonObj2.isPromptReq(id)) {
                if (nLastAction == 1 && nResubmit > 0) return;
                form.ICResubmit.value = nResubmit;
                form.submit();
                if (!ptCommonObj2.isICQryDownload(form, id))
                    nResubmit++;
            }
            else if (ptCommonObj2.isPromptReq(id))
                pAction_win4(form, id, arguments[2]);
            else
                aAction_win4(form, actionName, null, true, false, sAjaxTrfUrl, bWarning, sScriptAfter, nTrfURLType);
            cancelBubble(event);
        }
    </script>
    <script language="JavaScript" type="text/javascript" src="https://studentadmin.manchester.ac.uk/cs/CSPROD/cache/PTMAF_PUSH_JS_MIN_1.js">
    </script>
    <script language="JavaScript" type="text/javascript" src="https://studentadmin.manchester.ac.uk/cs/CSPROD/cache/PT_QAB_POPUP_JS_win4_MIN_1.js">
    </script>
    <script language="JavaScript" type="text/javascript" src="https://studentadmin.manchester.ac.uk/cs/CSPROD/cache/PTS_INTELLISEARCH_JS_win4_MIN_1.js">
    </script>
    <script language="JavaScript" type="text/javascript" src="https://studentadmin.manchester.ac.uk/cs/CSPROD/cache/PTNUI_PINTO_JS_MIN_1.js">
    </script>
    <script language="JavaScript" type="text/javascript" src="https://studentadmin.manchester.ac.uk/cs/CSPROD/cache/PT_PPM_FUNCTIONS_JS_MIN_1.js">
    </script>
    <script language="javascript">
        var pt_calHeadstyle = " class='PTCALHEAD' "
        var pt_calWeekHeadstyle = " class='PTCALWEEKHEAD' "
        function dateitemrefs() {
            this.pt_dateheader = "https://studentadmin.manchester.ac.uk/cs/CSPROD/cache/PT_PORTAL_IC_CLOSE_SD_CSS_1.gif";
            this.pt_datering = "https://studentadmin.manchester.ac.uk/cs/CSPROD/cache/PT_CURRENT_DATE_SD_CSS_1.gif";
            this.pt_datesel = "https://studentadmin.manchester.ac.uk/cs/CSPROD/cache/PT_SELECTED_DATE_SD_CSS_1.gif";
            this.pt_nextmonth = "https://studentadmin.manchester.ac.uk/cs/CSPROD/cache/PT_RIGHT_SCROLL_SD_CSS_1.gif";
            this.pt_prevmonth = "https://studentadmin.manchester.ac.uk/cs/CSPROD/cache/PT_LEFT_SCROLL_SD_CSS_1.gif";
            this.pt_daystitle_hijri = "https://studentadmin.manchester.ac.uk/cs/CSPROD/cache/PT_DATE_TITLE_S6_1.GIF";
            this.pt_daystitle_thai = "https://studentadmin.manchester.ac.uk/cs/CSPROD/cache/PT_DATE_TITLE_S0_1.GIF";
            this.pt_daystitle_s0 = "https://studentadmin.manchester.ac.uk/cs/CSPROD/cache/PT_DATE_TITLE_S0_1.GIF";
            this.pt_daystitle_m1 = "https://studentadmin.manchester.ac.uk/cs/CSPROD/cache/PT_DATE_TITLE_M1_1.GIF";
            this.pt_daystitle_t2 = "https://studentadmin.manchester.ac.uk/cs/CSPROD/cache/PT_DATE_TITLE_T2_1.GIF";
            this.pt_daystitle_w3 = "https://studentadmin.manchester.ac.uk/cs/CSPROD/cache/PT_DATE_TITLE_W3_1.GIF";
            this.pt_daystitle_t4 = "https://studentadmin.manchester.ac.uk/cs/CSPROD/cache/PT_DATE_TITLE_T4_1.GIF";
            this.pt_daystitle_f5 = "https://studentadmin.manchester.ac.uk/cs/CSPROD/cache/PT_DATE_TITLE_F5_1.gif";
            this.pt_daystitle_s6 = "https://studentadmin.manchester.ac.uk/cs/CSPROD/cache/PT_DATE_TITLE_S6_1.GIF";
        }

        function LoadCalendar() {
            var dateitems = new dateitemrefs();
            loadImages(dateitems);
        }
        function DatePrompt0_win4(dtfield, promptfield, yrfmt, bsubmit) {
            setupTimeout2();
            openDate_win4(dtfield, promptfield, "DMY/" + yrfmt, bsubmit, "G", 0);
        }
    </script>
    <script language="JavaScript" ptdefer="defer">
        var bInModal = false;
        function onLoadExt_win4() {
            modalZoomName = null;
            var oWin = window;
            var oDoc = document;
            ptTAObj_win4.init(oWin, oDoc, oDoc.win4, 'https://studentadmin.manchester.ac.uk/cs/CSPROD/cache/PT_SRT2UP_SEL_1.gif', 'https://studentadmin.manchester.ac.uk/cs/CSPROD/cache/PT_SRT2DN_SEL_1.gif', 'https://studentadmin.manchester.ac.uk/cs/CSPROD/cache/PT_PORTAL_IC_CLOSE_1.gif', 500);
            var pt_wrapper = document.getElementById('PT_WRAPPER');
            if (pt_wrapper) {
                pt_wrapper.setAttribute('class', 'ps_wrapper  pst_side2-disabled pst_side1-fixed pst_panel-mode ');
                addClass(pt_wrapper, sMDWrapperStyle);
                removeClass(pt_wrapper, 'pst_side1-disabled');
                addClass(pt_wrapper, 'pst_side2-disabled');
                sPageFFStyle = '';
            } sMDWrapperStyle = ' pst_side2-disabled pst_side1-fixed pst_panel-mode '
            var objPanelControlStyle = document.getElementById('ICPanelControlStyle');
            if (objPanelControlStyle) objPanelControlStyle.value = 'pst_side2-disabled pst_side1-fixed pst_panel-mode ';
            initWorkers('https://studentadmin.manchester.ac.uk/cs/CSPROD/cache/PT_WORKER_MIN_1.js', 5);

            g_bAccessibilityMode = false;
            var actn = '';
            setKeyEventHandler_win4(); setMouseEventHandler();
            ptEvent.add(window, 'scroll', positionWAIT_win4);
            if (typeof (ptLongEditCounter) != 'undefined' && ptLongEditCounter != null)
                ptLongEditCounter.onLoadLongEditCounter();
            objToBeFocus = null;
            if (bPTDrag) CancelDragAccessible();
            bPTDrag = false;
            if (typeof oWin == 'undefined') setEventHandlers_win4('ICFirstAnchor_win4', 'ICLastAnchor_win4', false);
            else
                oWin.setEventHandlers_win4('ICFirstAnchor_win4', 'ICLastAnchor_win4', false);
            try {
                PTQABWin.Url = 'https://studentadmin.manchester.ac.uk/psc/CSPROD_newwin/EMPLOYEE/SA/c/NUI_FRAMEWORK.PT_QAB_POPUP_FL.GBL?ICDoModelessIframe=1';
                ptsSearchUIObj.initSearch("{\"page\":\"SCC_MD_TGT_PAGE_FL\",\"placeholder\":\"\",\"searchcategory\":\"\",\"scLabel\":\"\",\"includeHiddenCref\":false,\"includeOnlyCompOrGeneric\":false,\"showGridIcons\":true,\"showCategoryDropDown\":true,\"showGlobalSearchButton\":true,\"componentSearchURL\":\"\",\"hideSearch\":true,\"openSearchInModal\":false,\"isInitialLoad\":false,\"showCompletePath\":false,\"keywordLabel\":\"\",\"srchWidgetId\":\"win4hdrdivPTS_SEARCHWIDGET\",\"isAccessibilityMode\":false}")
                portalContextNodeURI = 'https://studentadmin.manchester.ac.uk/psc/CSPROD_4/EMPLOYEE/SA';
                SearchPageClose();
            } catch (e) { if (typeof String !== 'undefined') alert('custom javascript error ' + e.message); }
            if (top.window.isFModeLayout() && (typeof top.window.initHelp == 'function')) top.window.initHelp();
            postUrl_win4 = 'https://studentadmin.manchester.ac.uk/psc/CSPROD_4/EMPLOYEE/SA/c/SSR_STUDENT_ACAD_REC_FL.SSR_MD_ACAD_REC_FL.GBL';
            if (typeof (initScrolls0) != 'undefined' && initScrolls0 != null) initScrolls0(false);
            loadGrouplets('https://studentadmin.manchester.ac.uk/cs/CSPROD/cache/PT_WORKER_MIN_1.js', 5);
            ptLoadingStatus_empty(0);
            setupTimeout2();
            processing_win4(0, 3000);
            ptConsole2.enable();
        }
        try { ptEvent.load(onLoadExt_win4); } catch (e) { }
    </script>
</head>

<body tabindex="-1">
    <div id="pt_envinfo" devicetype="pc" browser="CHROME/126.0/WIN10"></div>
    <form id="SSR_MD_ACAD_REC_FL" name="win4" method="post" action="https://studentadmin.manchester.ac.uk/psc/CSPROD_4/EMPLOYEE/SA/c/SSR_STUDENT_ACAD_REC_FL.SSR_MD_ACAD_REC_FL.GBL" autocomplete="off" class="PSForm">
        <div class="ps_box-toolshiddens" id="win4divPSTOOLSHIDDENS">
            <div class="ps_modalmask_cover psc_hidden" id="pt_modalMaskCover">&nbsp;</div>
            <div class="ps_modalmask psc_hidden" id="pt_modalMask">&nbsp;</div>
            <div id="pt_modals" class="ps_modal_controller">
                <div id="ptModalShadow" class="popupDragFrame" style="cursor:nw-resize">&nbsp;</div>
            </div>
            <div class="ps_ajax_console psc_hidden" id="pt_console"></div>
            <div class="ps_box-group psc_layout psc_skipnav_container" id="PT_SKIPNAV_CONT">
                <div class="ps_box-link psc_skipnav"><span class="ps-link-wrapper"><a class="ps-link" id="PT_SKIPNAV" onclick="javascript:cancelBubble(event);" href="javascript:SetMainContentFocus();" onblur="javascript:SetMainContentFocus(false);">Skip to Main Content</a></span></div>
            </div>
            <div class="ps_typeahead psc_hidden" id="pt_typeahead0" style="display: none;">
                <div id="pt_typeahead" class="ps_box-typeahead">&nbsp;</div>
            </div>
            <div class="ps_box-announce ps_alert-normal" aria-live="polite" id="pt_liveregion"></div>
            <div id="pt_dnd_win4" class="psc_hidden">Press Control+M to start dragging object</div>
            <div class="psc_processing psc_hidden" id="WAIT_win4"><img id="processing" src="https://studentadmin.manchester.ac.uk/cs/CSPROD/cache/PT_PROCESSING_FMODE_1.gif" alt="Processing... please wait" title="Processing... please wait"></div>
            <div style="visibility:hidden; display:none; position:absolute;left:auto;top:-10000px; width:1px; height:1px;overflow:hidden;" aria-relevant="text additions" aria-live="assertive" aria-atomic="true" class="psc_processing psc_hidden" id="Delayed_win4">&nbsp;</div>
            <div class="psc_saved psc_hidden" id="SAVED_win4">
                <div>
                    <div id="saveWait_win4"><img src="https://studentadmin.manchester.ac.uk/cs/CSPROD/cache/PT_LOADER_1.gif" width="24" height="24" alt="">
                    </div>
                    <div class="ps_saved_text"><span id="ptStatusText_win4">&nbsp;</span></div>
                </div>
            </div>
            <div class="x" id="win4divPSHIDDENFIELDS" style="display:none"><input type="hidden" name="ICType" id="ICType" value="Panel">
                <input type="hidden" name="ICElementNum" id="ICElementNum" value="4">
                <input type="hidden" name="ICStateNum" id="ICStateNum" value="1">
                <input type="hidden" name="ICAction" id="ICAction" value="None">
                <input type="hidden" name="ICModelCancel" id="ICModelCancel" value="0">
                <input type="hidden" name="ICXPos" id="ICXPos" value="0">
                <input type="hidden" name="ICYPos" id="ICYPos" value="0">
                <input type="hidden" name="ResponsetoDiffFrame" id="ResponsetoDiffFrame" value="-1">
                <input type="hidden" name="TargetFrameName" id="TargetFrameName" value="None">
                <input type="hidden" name="FacetPath" id="FacetPath" value="None">
                <input type="hidden" name="ICFocus" id="ICFocus" value="">
                <input type="hidden" name="ICSaveWarningFilter" id="ICSaveWarningFilter" value="0">
                <input type="hidden" name="ICChanged" id="ICChanged" value="0">
                <input type="hidden" name="ICSkipPending" id="ICSkipPending" value="0">
                <input type="hidden" name="ICAutoSave" id="ICAutoSave" value="0">
                <input type="hidden" name="ICResubmit" id="ICResubmit" value="0">
                <input type="hidden" name="ICSID" id="ICSID" value="TWTGSKXZAEgZYlhnMqBe39GRNECWHuJaEDeLkuzGs9w=">
                <input type="hidden" name="ICActionPrompt" id="ICActionPrompt" value="false">
                <input type="hidden" name="ICTypeAheadID" id="ICTypeAheadID" value="">
                <input type="hidden" name="ICBcDomData" id="ICBcDomData" value="">
                <input type="hidden" name="ICDNDSrc" id="ICDNDSrc" value="">
                <input type="hidden" name="ICPanelHelpUrl" id="ICPanelHelpUrl" value="">
                <input type="hidden" name="ICPanelName" id="ICPanelName" value="">
                <input type="hidden" name="ICPanelControlStyle" id="ICPanelControlStyle" value="pst_side2-disabled pst_side1-fixed pst_panel-mode ">
                <input type="hidden" name="ICFind" id="ICFind" value="">
                <input type="hidden" name="ICAddCount" id="ICAddCount" value="">
                <input type="hidden" name="ICAppClsData" id="ICAppClsData" value="">
            </div>
        </div>
        <a class="ps-anchor" id="ICFirstAnchor_win4"></a>
        <div id="PT_WRAPPER" class="ps_wrapper pst_side2-disabled pst_side1-fixed pst_panel-mode">
            <div class="ps_header" id="PT_HEADER">
                <div class="ps_header_panel" id="PT_HEADER_PANEL">
                    <div class="ps_pspagecontainer_hdr" id="win4divPSPAGECONTAINER_HDR">
                        <div class="ps_box-group psc_layout ps_header_bar-container" id="win4hdrdivPTLAYOUT_HEADER_GROUPBOX0">
                            <div class=" psc_force-hidden" id="win4hdrdivICSCRIPTSID">
                                <div class="ps_box-label" id="win4hdrdivICSCRIPTSIDlbl"><span class="ps-label">&nbsp;</span></div><span class="ps_box-value" id="ICSCRIPTSID">ptnbsid=HTv%2bIfm5QwXbLg0Q4y40wM2HAXY%3d</span>
                            </div>
                            <div role="banner" class=" ps_header_bar" id="win4hdrdivPTLAYOUT_HEADER_GROUPBOX1">
                                <div class=" ps_header_bar_cont" id="win4hdrdivHEADER_BAR_CONT">
                                    <div class=" ps_back_cont" id="win4hdrdivPT_NAV_CONT">
                                        <div class=" ps_system_cont" id="win4hdrdivPTLAYOUT_HEADER_GROUPBOX4">
                                            <div class="ps_box-button psc_toolaction-back psc_header-all   psc_image_only ps_header_button psc_disabled" id="win4hdrdivPT_WORK_PT_BUTTON_BACK"><span class="ps-button-wrapper" title="Back"><a id="PT_WORK_PT_BUTTON_BACK" class="ps-button" role="button" href="javascript:DoBack('win4')" onclick="javascript:cancelBubble(event);"><img src="https://studentadmin.manchester.ac.uk/cs/CSPROD/cache/PT_NUI_BACK_PRIM_IMG_1.svg" id="PT_WORK_PT_BUTTON_BACK$IMG" class="ps-img" alt=""><span class="ps-text">Back</span></a></span></div>
                                            <div class="ps_box-group psc_layout" id="win4hdrdiv$ICField69"></div>
                                            <div class="ps_box-group psc_layout pt_hdr-qabcontainer " id="win4hdrdivHDR_QAB_TOOLBAR">
                                                <ul class="ps_box-group psc_layout pt_keynav-list " id="win4hdrdivHDR_QAB_MENU">
                                                    <li class="ps_box-group psc_layout" id="win4hdrdiv$ICField75">
                                                        <div class="ps_box-button psc_image_only pt_qab-recents ps_header_button" id="win4hdrdivHDR_MRU_BTN"><span class="ps-button-wrapper" title="Recently Visited"><a id="HDR_MRU_BTN" class="ps-button" href="javascript:DoQABpopup('MRU');" role="button" onclick="javascript:cancelBubble(event);"><img src="https://studentadmin.manchester.ac.uk/cs/CSPROD/cache/PT_MRU_HDR_ICN_1.svg" id="HDR_MRU_BTN$IMG" class="ps-img" alt="Recently Visited"></a></span></div>
                                                    </li>
                                                    <li class="ps_box-group psc_layout" id="win4hdrdiv$ICField76">
                                                        <div class="ps_box-button psc_image_only pt_qab-favorites ps_header_button" id="win4hdrdivHDR_FAV_BTN"><span class="ps-button-wrapper" title="Favorites"><a id="HDR_FAV_BTN" class="ps-button" href="javascript:DoQABpopup('FAV');" role="button" onclick="javascript:cancelBubble(event);"><img src="https://studentadmin.manchester.ac.uk/cs/CSPROD/cache/PT_FAV_HDR_ICN_1.svg" id="HDR_FAV_BTN$IMG" class="ps-img" alt="Favorites"></a></span></div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class=" ps_custom_cont ps_target-custleft" id="win4hdrdivPT_CUSTOM_LEFT">
                                        </div>
                                    </div>
                                    <div class=" ps_pagetitle_cont" id="win4hdrdivPT_TITLE_CONT">
                                        <div class=" ps_system_cont  ps_target-title  psc_force-hidden" id="win4hdrdivPT_PAGETITLE">
                                            <h1 id="PT_PAGETITLE" class="ps_pagetitle"><span class="ps-text" id="PT_PAGETITLElbl">Academic Records</span></h1>
                                        </div>
                                        <div class=" ps_custom_cont ps_target-custmiddle" id="win4hdrdivPT_CUSTOM_MIDDLE"></div>
                                        <div class=" ps_headersearch_cont psc_search-subdued" id="win4hdrdivPT_HDR_SEARCH_CONT">
                                            <div class="ps_box-group psc_layout pts_search_widget" id="win4hdrdivPTS_SEARCHWIDGET">
                                                <div class="ps_box-group psc_layout pts_search_mask psc_hidden" id="win4hdrdivPTS_MASK"></div>
                                                <div id="win4hdrdivPORTALOBJ" class=" psc_hidden">
                                                    <div id="win4hdrdivPORTALOBJlbl" class="ps_box-label"><label for="PORTALOBJ" id="PORTALOBJ_LBL" class="ps-label">&nbsp;</label></div>
                                                    <div id="win4hdrdivPORTALOBJctrl" class="ps_box-control"><input type="text" id="PORTALOBJ" class="ps-edit" value="" maxlength="30" onclick="javascript:cancelBubble(event);">
                                                    </div>
                                                </div>
                                                <div class="ps_box-group psc_layout pts_search_content psc_hidden" id="win4hdrdivPTSCONTENTBOX">
                                                    <div class="ps_box-group psc_layout pts_search_controls" id="win4hdrdivPTS_SEARCHEDIT">
                                                        <div class=" pts_back_button" id="win4hdrdivPTSBACKBTN"><span class="ps-button-wrapper" title="Back"><a id="PTSBACKBTN" class="ps-button" role="button" href="javascript:void(0);'" onclick="javascript:ptsSearchUIObj.ptsCloseAllLists()"><img src="https://studentadmin.manchester.ac.uk/cs/CSPROD/cache/PTS_INTSRCH6_ICN_1.svg" id="PTSBACKBTN$IMG" class="ps-img" alt="Back"></a></span></div>
                                                        <div class=" pts_category_button" id="win4hdrdivPTSCATEGORYBTN">
                                                            <span id="PTSCATEGORYBTN$span" class="ps-button-wrapper"><a id="PTSCATEGORYBTN" class="ps-button" role="button" aria-haspopup="true" ptlinktgt="pt_peoplecode" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'PTSCATEGORYBTN');">Search
                                                                    Category Name</a></span></div>
                                                        <div id="win4hdrdivPTSKEYWORD" class="ps_box-edit pts_editbox psc_label-hidereadable">
                                                            <div id="win4hdrdivPTSKEYWORDlbl" class="ps_box-label">
                                                                <label for="PTSKEYWORD" id="PTSKEYWORD_LBL" class="ps-label">Search keywords</label></div>
                                                            <div id="win4hdrdivPTSKEYWORDctrl" class="ps_box-control">
                                                                <input type="search" id="PTSKEYWORD" class="ps-edit" value="" onclick="javascript:cancelBubble(event);">
                                                            </div>
                                                        </div>
                                                        <div class=" pts_search_button" id="win4hdrdivPTSSEARCHBTN">
                                                            <span class="ps-button-wrapper" title="Search"><a id="PTSSEARCHBTN" class="ps-button" role="button" href="javascript:void(0);" onclick="javascript:ptsSearchUIObj.ptsDoGlobalSearch(this)"><img src="https://studentadmin.manchester.ac.uk/cs/CSPROD/cache/PTS_INTSRCH3_ICN_1.svg" id="PTSSEARCHBTN$IMG" class="ps-img" alt="Search"></a></span></div>
                                                    </div>
                                                    <div class="ps_box-group psc_layout pts_category_dropdown psc_hidden ps_scrollable sbar sbar_v ps_scrollable_v" id="win4hdrdivPTSCATEGORIES">
                                                        <div class="ps_box-group psc_layout psc_width-100pct" id="win4hdrdiv$ICField1">
                                                            <div class="ps_box-group psc_width-100pct pts_category_header1" id="win4hdrdivPTSCATEGORYHDR">
                                                                <h2 class="ps_header-group"><span class="ps-text" id="PTSCATEGORYHDRlbl">Search in...</span></h2>
                                                                <div class="ps_content-group" id="win4hdrdivPTSCATEGORYHDRgrp">
                                                                    <div role="presentation" class="ps_box-grid-menu" id="win4hdrdivPTS_INTSCHM_DVW$0">
                                                                        <div role="presentation" class="ps_box-gridc" id="win4hdrdivPTS_INTSCHM_DVWgridc$0">
                                                                            <div role="presentation" class="ps_box-gridc-right" id="win4hdrdivPTS_INTSCHM_DVWgridc-right$0">
                                                                                <div role="presentation" class="ps_box-grid" id="win4hdrdivPTS_INTSCHM_DVW$grid$0">
                                                                                    <div class="ps_grid-menu" role="presentation">
                                                                                        <ul class="ps_grid-body ps_box-menucontainer ps_menucontainer pt_keynav-list" role="menu">
                                                                                            <li class="ps_grid-row ps_box-menuitem" id="PTS_INTSCHM_DVW$0_row_0" role="presentation">
                                                                                                <div role="presentation" class="ps_box-link" id="win4hdrdivPTSMENU$0">
                                                                                                    <span id="PTSMENU$span$0" class="ps-link-wrapper" role="presentation"><a id="PTSMENU$0" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" role="menuitem" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'PTSMENU$0');">Search
                                                                                                            Category
                                                                                                            Name</a></span>
                                                                                                </div>
                                                                                            </li>
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="ps_box-group psc_layout pts_search_tray psc_hidden ps_scrollable sbar sbar_v ps_scrollable_v" id="win4hdrdivPTSSEARCHTRAY">
                                                        <div class="ps_box-group psc_layout psc_padding-left5px pts_message psc_hidden" id="win4hdrdivPTSDISPLAYMSG">
                                                            <div class="ps_box-text" id="win4hdrdiv$ICField45"><span class="ps-text">No results to display</span>
                                                            </div>
                                                        </div>
                                                        <div class="ps_box-group psc_layout pts_results_grid" id="win4hdrdivPTSRESULTS">
                                                            <div role="presentation" class="ps_box-grid-menu psc_width-100pct psc_grid-norowcount" id="win4hdrdivPTS_INTELLISRCH_RS$0">
                                                                <div role="presentation" class="ps_box-gridc" id="win4hdrdivPTS_INTELLISRCH_RSgridc$0">
                                                                    <div role="presentation" class="ps_box-gridc-right" id="win4hdrdivPTS_INTELLISRCH_RSgridc-right$0">
                                                                        <div role="presentation" class="ps_box-grid" id="win4hdrdivPTS_INTELLISRCH_RS$grid$0">
                                                                            <div class="ps_grid-menu" role="presentation">
                                                                                <ul class="ps_grid-body ps_box-menucontainer ps_menucontainer pt_keynav-list" role="menu">
                                                                                    <li class="ps_grid-row ps_box-menuitem" id="PTS_INTELLISRCH_RS$0_row_0" role="presentation">
                                                                                        <div role="presentation" class="ps_box-link pts_result_link" id="win4hdrdivPTSTITLE$0">
                                                                                            <span id="PTSTITLE$span$0" class="ps-link-wrapper" role="presentation"><a id="PTSTITLE$0" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" role="menuitem" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'PTSTITLE$0');">Title</a></span>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li class="ps_grid-row ps_box-menuitem" id="PTS_INTELLISRCH_RS$0_row_1" role="presentation">
                                                                                        <div role="presentation" class="ps_box-link pts_result_link" id="win4hdrdivPTSTITLE$1">
                                                                                            <span id="PTSTITLE$span$1" class="ps-link-wrapper" role="presentation"><a id="PTSTITLE$1" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" role="menuitem" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'PTSTITLE$1');">Title</a></span>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li class="ps_grid-row ps_box-menuitem" id="PTS_INTELLISRCH_RS$0_row_2" role="presentation">
                                                                                        <div role="presentation" class="ps_box-link pts_result_link" id="win4hdrdivPTSTITLE$2">
                                                                                            <span id="PTSTITLE$span$2" class="ps-link-wrapper" role="presentation"><a id="PTSTITLE$2" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" role="menuitem" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'PTSTITLE$2');">Title</a></span>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li class="ps_grid-row ps_box-menuitem" id="PTS_INTELLISRCH_RS$0_row_3" role="presentation">
                                                                                        <div role="presentation" class="ps_box-link pts_result_link" id="win4hdrdivPTSTITLE$3">
                                                                                            <span id="PTSTITLE$span$3" class="ps-link-wrapper" role="presentation"><a id="PTSTITLE$3" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" role="menuitem" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'PTSTITLE$3');">Title</a></span>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li class="ps_grid-row ps_box-menuitem" id="PTS_INTELLISRCH_RS$0_row_4" role="presentation">
                                                                                        <div role="presentation" class="ps_box-link pts_result_link" id="win4hdrdivPTSTITLE$4">
                                                                                            <span id="PTSTITLE$span$4" class="ps-link-wrapper" role="presentation"><a id="PTSTITLE$4" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" role="menuitem" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'PTSTITLE$4');">Title</a></span>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li class="ps_grid-row ps_box-menuitem" id="PTS_INTELLISRCH_RS$0_row_5" role="presentation">
                                                                                        <div role="presentation" class="ps_box-link pts_result_link" id="win4hdrdivPTSTITLE$5">
                                                                                            <span id="PTSTITLE$span$5" class="ps-link-wrapper" role="presentation"><a id="PTSTITLE$5" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" role="menuitem" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'PTSTITLE$5');">Title</a></span>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li class="ps_grid-row ps_box-menuitem" id="PTS_INTELLISRCH_RS$0_row_6" role="presentation">
                                                                                        <div role="presentation" class="ps_box-link pts_result_link" id="win4hdrdivPTSTITLE$6">
                                                                                            <span id="PTSTITLE$span$6" class="ps-link-wrapper" role="presentation"><a id="PTSTITLE$6" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" role="menuitem" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'PTSTITLE$6');">Title</a></span>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li class="ps_grid-row ps_box-menuitem" id="PTS_INTELLISRCH_RS$0_row_7" role="presentation">
                                                                                        <div role="presentation" class="ps_box-link pts_result_link" id="win4hdrdivPTSTITLE$7">
                                                                                            <span id="PTSTITLE$span$7" class="ps-link-wrapper" role="presentation"><a id="PTSTITLE$7" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" role="menuitem" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'PTSTITLE$7');">Title</a></span>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li class="ps_grid-row ps_box-menuitem" id="PTS_INTELLISRCH_RS$0_row_8" role="presentation">
                                                                                        <div role="presentation" class="ps_box-link pts_result_link" id="win4hdrdivPTSTITLE$8">
                                                                                            <span id="PTSTITLE$span$8" class="ps-link-wrapper" role="presentation"><a id="PTSTITLE$8" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" role="menuitem" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'PTSTITLE$8');">Title</a></span>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li class="ps_grid-row ps_box-menuitem" id="PTS_INTELLISRCH_RS$0_row_9" role="presentation">
                                                                                        <div role="presentation" class="ps_box-link pts_result_link" id="win4hdrdivPTSTITLE$9">
                                                                                            <span id="PTSTITLE$span$9" class="ps-link-wrapper" role="presentation"><a id="PTSTITLE$9" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" role="menuitem" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'PTSTITLE$9');">Title</a></span>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li class="ps_grid-row ps_box-menuitem" id="PTS_INTELLISRCH_RS$0_row_10" role="presentation">
                                                                                        <div role="presentation" class="ps_box-link pts_result_link" id="win4hdrdivPTSTITLE$10">
                                                                                            <span id="PTSTITLE$span$10" class="ps-link-wrapper" role="presentation"><a id="PTSTITLE$10" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" role="menuitem" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'PTSTITLE$10');">Title</a></span>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li class="ps_grid-row ps_box-menuitem" id="PTS_INTELLISRCH_RS$0_row_11" role="presentation">
                                                                                        <div role="presentation" class="ps_box-link pts_result_link" id="win4hdrdivPTSTITLE$11">
                                                                                            <span id="PTSTITLE$span$11" class="ps-link-wrapper" role="presentation"><a id="PTSTITLE$11" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" role="menuitem" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'PTSTITLE$11');">Title</a></span>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li class="ps_grid-row ps_box-menuitem" id="PTS_INTELLISRCH_RS$0_row_12" role="presentation">
                                                                                        <div role="presentation" class="ps_box-link pts_result_link" id="win4hdrdivPTSTITLE$12">
                                                                                            <span id="PTSTITLE$span$12" class="ps-link-wrapper" role="presentation"><a id="PTSTITLE$12" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" role="menuitem" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'PTSTITLE$12');">Title</a></span>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li class="ps_grid-row ps_box-menuitem" id="PTS_INTELLISRCH_RS$0_row_13" role="presentation">
                                                                                        <div role="presentation" class="ps_box-link pts_result_link" id="win4hdrdivPTSTITLE$13">
                                                                                            <span id="PTSTITLE$span$13" class="ps-link-wrapper" role="presentation"><a id="PTSTITLE$13" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" role="menuitem" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'PTSTITLE$13');">Title</a></span>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li class="ps_grid-row ps_box-menuitem" id="PTS_INTELLISRCH_RS$0_row_14" role="presentation">
                                                                                        <div role="presentation" class="ps_box-link pts_result_link" id="win4hdrdivPTSTITLE$14">
                                                                                            <span id="PTSTITLE$span$14" class="ps-link-wrapper" role="presentation"><a id="PTSTITLE$14" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" role="menuitem" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'PTSTITLE$14');">Title</a></span>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li class="ps_grid-row ps_box-menuitem" id="PTS_INTELLISRCH_RS$0_row_15" role="presentation">
                                                                                        <div role="presentation" class="ps_box-link pts_result_link" id="win4hdrdivPTSTITLE$15">
                                                                                            <span id="PTSTITLE$span$15" class="ps-link-wrapper" role="presentation"><a id="PTSTITLE$15" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" role="menuitem" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'PTSTITLE$15');">Title</a></span>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li class="ps_grid-row ps_box-menuitem" id="PTS_INTELLISRCH_RS$0_row_16" role="presentation">
                                                                                        <div role="presentation" class="ps_box-link pts_result_link" id="win4hdrdivPTSTITLE$16">
                                                                                            <span id="PTSTITLE$span$16" class="ps-link-wrapper" role="presentation"><a id="PTSTITLE$16" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" role="menuitem" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'PTSTITLE$16');">Title</a></span>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li class="ps_grid-row ps_box-menuitem" id="PTS_INTELLISRCH_RS$0_row_17" role="presentation">
                                                                                        <div role="presentation" class="ps_box-link pts_result_link" id="win4hdrdivPTSTITLE$17">
                                                                                            <span id="PTSTITLE$span$17" class="ps-link-wrapper" role="presentation"><a id="PTSTITLE$17" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" role="menuitem" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'PTSTITLE$17');">Title</a></span>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li class="ps_grid-row ps_box-menuitem" id="PTS_INTELLISRCH_RS$0_row_18" role="presentation">
                                                                                        <div role="presentation" class="ps_box-link pts_result_link" id="win4hdrdivPTSTITLE$18">
                                                                                            <span id="PTSTITLE$span$18" class="ps-link-wrapper" role="presentation"><a id="PTSTITLE$18" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" role="menuitem" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'PTSTITLE$18');">Title</a></span>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li class="ps_grid-row ps_box-menuitem" id="PTS_INTELLISRCH_RS$0_row_19" role="presentation">
                                                                                        <div role="presentation" class="ps_box-link pts_result_link" id="win4hdrdivPTSTITLE$19">
                                                                                            <span id="PTSTITLE$span$19" class="ps-link-wrapper" role="presentation"><a id="PTSTITLE$19" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" role="menuitem" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'PTSTITLE$19');">Title</a></span>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li class="ps_grid-row ps_box-menuitem" id="PTS_INTELLISRCH_RS$0_row_20" role="presentation">
                                                                                        <div role="presentation" class="ps_box-link pts_result_link" id="win4hdrdivPTSTITLE$20">
                                                                                            <span id="PTSTITLE$span$20" class="ps-link-wrapper" role="presentation"><a id="PTSTITLE$20" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" role="menuitem" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'PTSTITLE$20');">Title</a></span>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li class="ps_grid-row ps_box-menuitem" id="PTS_INTELLISRCH_RS$0_row_21" role="presentation">
                                                                                        <div role="presentation" class="ps_box-link pts_result_link" id="win4hdrdivPTSTITLE$21">
                                                                                            <span id="PTSTITLE$span$21" class="ps-link-wrapper" role="presentation"><a id="PTSTITLE$21" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" role="menuitem" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'PTSTITLE$21');">Title</a></span>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li class="ps_grid-row ps_box-menuitem" id="PTS_INTELLISRCH_RS$0_row_22" role="presentation">
                                                                                        <div role="presentation" class="ps_box-link pts_result_link" id="win4hdrdivPTSTITLE$22">
                                                                                            <span id="PTSTITLE$span$22" class="ps-link-wrapper" role="presentation"><a id="PTSTITLE$22" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" role="menuitem" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'PTSTITLE$22');">Title</a></span>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li class="ps_grid-row ps_box-menuitem" id="PTS_INTELLISRCH_RS$0_row_23" role="presentation">
                                                                                        <div role="presentation" class="ps_box-link pts_result_link" id="win4hdrdivPTSTITLE$23">
                                                                                            <span id="PTSTITLE$span$23" class="ps-link-wrapper" role="presentation"><a id="PTSTITLE$23" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" role="menuitem" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'PTSTITLE$23');">Title</a></span>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li class="ps_grid-row ps_box-menuitem" id="PTS_INTELLISRCH_RS$0_row_24" role="presentation">
                                                                                        <div role="presentation" class="ps_box-link pts_result_link" id="win4hdrdivPTSTITLE$24">
                                                                                            <span id="PTSTITLE$span$24" class="ps-link-wrapper" role="presentation"><a id="PTSTITLE$24" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" role="menuitem" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'PTSTITLE$24');">Title</a></span>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li class="ps_grid-row ps_box-menuitem" id="PTS_INTELLISRCH_RS$0_row_25" role="presentation">
                                                                                        <div role="presentation" class="ps_box-link pts_result_link" id="win4hdrdivPTSTITLE$25">
                                                                                            <span id="PTSTITLE$span$25" class="ps-link-wrapper" role="presentation"><a id="PTSTITLE$25" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" role="menuitem" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'PTSTITLE$25');">Title</a></span>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li class="ps_grid-row ps_box-menuitem" id="PTS_INTELLISRCH_RS$0_row_26" role="presentation">
                                                                                        <div role="presentation" class="ps_box-link pts_result_link" id="win4hdrdivPTSTITLE$26">
                                                                                            <span id="PTSTITLE$span$26" class="ps-link-wrapper" role="presentation"><a id="PTSTITLE$26" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" role="menuitem" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'PTSTITLE$26');">Title</a></span>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li class="ps_grid-row ps_box-menuitem" id="PTS_INTELLISRCH_RS$0_row_27" role="presentation">
                                                                                        <div role="presentation" class="ps_box-link pts_result_link" id="win4hdrdivPTSTITLE$27">
                                                                                            <span id="PTSTITLE$span$27" class="ps-link-wrapper" role="presentation"><a id="PTSTITLE$27" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" role="menuitem" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'PTSTITLE$27');">Title</a></span>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li class="ps_grid-row ps_box-menuitem" id="PTS_INTELLISRCH_RS$0_row_28" role="presentation">
                                                                                        <div role="presentation" class="ps_box-link pts_result_link" id="win4hdrdivPTSTITLE$28">
                                                                                            <span id="PTSTITLE$span$28" class="ps-link-wrapper" role="presentation"><a id="PTSTITLE$28" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" role="menuitem" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'PTSTITLE$28');">Title</a></span>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li class="ps_grid-row ps_box-menuitem" id="PTS_INTELLISRCH_RS$0_row_29" role="presentation">
                                                                                        <div role="presentation" class="ps_box-link pts_result_link" id="win4hdrdivPTSTITLE$29">
                                                                                            <span id="PTSTITLE$span$29" class="ps-link-wrapper" role="presentation"><a id="PTSTITLE$29" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" role="menuitem" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'PTSTITLE$29');">Title</a></span>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li class="ps_grid-row ps_box-menuitem" id="PTS_INTELLISRCH_RS$0_row_30" role="presentation">
                                                                                        <div role="presentation" class="ps_box-link pts_result_link" id="win4hdrdivPTSTITLE$30">
                                                                                            <span id="PTSTITLE$span$30" class="ps-link-wrapper" role="presentation"><a id="PTSTITLE$30" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" role="menuitem" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'PTSTITLE$30');">Title</a></span>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li class="ps_grid-row ps_box-menuitem" id="PTS_INTELLISRCH_RS$0_row_31" role="presentation">
                                                                                        <div role="presentation" class="ps_box-link pts_result_link" id="win4hdrdivPTSTITLE$31">
                                                                                            <span id="PTSTITLE$span$31" class="ps-link-wrapper" role="presentation"><a id="PTSTITLE$31" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" role="menuitem" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'PTSTITLE$31');">Title</a></span>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li class="ps_grid-row ps_box-menuitem" id="PTS_INTELLISRCH_RS$0_row_32" role="presentation">
                                                                                        <div role="presentation" class="ps_box-link pts_result_link" id="win4hdrdivPTSTITLE$32">
                                                                                            <span id="PTSTITLE$span$32" class="ps-link-wrapper" role="presentation"><a id="PTSTITLE$32" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" role="menuitem" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'PTSTITLE$32');">Title</a></span>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li class="ps_grid-row ps_box-menuitem" id="PTS_INTELLISRCH_RS$0_row_33" role="presentation">
                                                                                        <div role="presentation" class="ps_box-link pts_result_link" id="win4hdrdivPTSTITLE$33">
                                                                                            <span id="PTSTITLE$span$33" class="ps-link-wrapper" role="presentation"><a id="PTSTITLE$33" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" role="menuitem" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'PTSTITLE$33');">Title</a></span>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li class="ps_grid-row ps_box-menuitem" id="PTS_INTELLISRCH_RS$0_row_34" role="presentation">
                                                                                        <div role="presentation" class="ps_box-link pts_result_link" id="win4hdrdivPTSTITLE$34">
                                                                                            <span id="PTSTITLE$span$34" class="ps-link-wrapper" role="presentation"><a id="PTSTITLE$34" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" role="menuitem" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'PTSTITLE$34');">Title</a></span>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li class="ps_grid-row ps_box-menuitem" id="PTS_INTELLISRCH_RS$0_row_35" role="presentation">
                                                                                        <div role="presentation" class="ps_box-link pts_result_link" id="win4hdrdivPTSTITLE$35">
                                                                                            <span id="PTSTITLE$span$35" class="ps-link-wrapper" role="presentation"><a id="PTSTITLE$35" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" role="menuitem" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'PTSTITLE$35');">Title</a></span>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li class="ps_grid-row ps_box-menuitem" id="PTS_INTELLISRCH_RS$0_row_36" role="presentation">
                                                                                        <div role="presentation" class="ps_box-link pts_result_link" id="win4hdrdivPTSTITLE$36">
                                                                                            <span id="PTSTITLE$span$36" class="ps-link-wrapper" role="presentation"><a id="PTSTITLE$36" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" role="menuitem" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'PTSTITLE$36');">Title</a></span>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li class="ps_grid-row ps_box-menuitem" id="PTS_INTELLISRCH_RS$0_row_37" role="presentation">
                                                                                        <div role="presentation" class="ps_box-link pts_result_link" id="win4hdrdivPTSTITLE$37">
                                                                                            <span id="PTSTITLE$span$37" class="ps-link-wrapper" role="presentation"><a id="PTSTITLE$37" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" role="menuitem" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'PTSTITLE$37');">Title</a></span>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li class="ps_grid-row ps_box-menuitem" id="PTS_INTELLISRCH_RS$0_row_38" role="presentation">
                                                                                        <div role="presentation" class="ps_box-link pts_result_link" id="win4hdrdivPTSTITLE$38">
                                                                                            <span id="PTSTITLE$span$38" class="ps-link-wrapper" role="presentation"><a id="PTSTITLE$38" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" role="menuitem" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'PTSTITLE$38');">Title</a></span>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li class="ps_grid-row ps_box-menuitem" id="PTS_INTELLISRCH_RS$0_row_39" role="presentation">
                                                                                        <div role="presentation" class="ps_box-link pts_result_link" id="win4hdrdivPTSTITLE$39">
                                                                                            <span id="PTSTITLE$span$39" class="ps-link-wrapper" role="presentation"><a id="PTSTITLE$39" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" role="menuitem" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'PTSTITLE$39');">Title</a></span>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li class="ps_grid-row ps_box-menuitem" id="PTS_INTELLISRCH_RS$0_row_40" role="presentation">
                                                                                        <div role="presentation" class="ps_box-link pts_result_link" id="win4hdrdivPTSTITLE$40">
                                                                                            <span id="PTSTITLE$span$40" class="ps-link-wrapper" role="presentation"><a id="PTSTITLE$40" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" role="menuitem" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'PTSTITLE$40');">Title</a></span>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li class="ps_grid-row ps_box-menuitem" id="PTS_INTELLISRCH_RS$0_row_41" role="presentation">
                                                                                        <div role="presentation" class="ps_box-link pts_result_link" id="win4hdrdivPTSTITLE$41">
                                                                                            <span id="PTSTITLE$span$41" class="ps-link-wrapper" role="presentation"><a id="PTSTITLE$41" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" role="menuitem" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'PTSTITLE$41');">Title</a></span>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li class="ps_grid-row ps_box-menuitem" id="PTS_INTELLISRCH_RS$0_row_42" role="presentation">
                                                                                        <div role="presentation" class="ps_box-link pts_result_link" id="win4hdrdivPTSTITLE$42">
                                                                                            <span id="PTSTITLE$span$42" class="ps-link-wrapper" role="presentation"><a id="PTSTITLE$42" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" role="menuitem" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'PTSTITLE$42');">Title</a></span>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li class="ps_grid-row ps_box-menuitem" id="PTS_INTELLISRCH_RS$0_row_43" role="presentation">
                                                                                        <div role="presentation" class="ps_box-link pts_result_link" id="win4hdrdivPTSTITLE$43">
                                                                                            <span id="PTSTITLE$span$43" class="ps-link-wrapper" role="presentation"><a id="PTSTITLE$43" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" role="menuitem" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'PTSTITLE$43');">Title</a></span>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li class="ps_grid-row ps_box-menuitem" id="PTS_INTELLISRCH_RS$0_row_44" role="presentation">
                                                                                        <div role="presentation" class="ps_box-link pts_result_link" id="win4hdrdivPTSTITLE$44">
                                                                                            <span id="PTSTITLE$span$44" class="ps-link-wrapper" role="presentation"><a id="PTSTITLE$44" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" role="menuitem" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'PTSTITLE$44');">Title</a></span>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li class="ps_grid-row ps_box-menuitem" id="PTS_INTELLISRCH_RS$0_row_45" role="presentation">
                                                                                        <div role="presentation" class="ps_box-link pts_result_link" id="win4hdrdivPTSTITLE$45">
                                                                                            <span id="PTSTITLE$span$45" class="ps-link-wrapper" role="presentation"><a id="PTSTITLE$45" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" role="menuitem" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'PTSTITLE$45');">Title</a></span>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li class="ps_grid-row ps_box-menuitem" id="PTS_INTELLISRCH_RS$0_row_46" role="presentation">
                                                                                        <div role="presentation" class="ps_box-link pts_result_link" id="win4hdrdivPTSTITLE$46">
                                                                                            <span id="PTSTITLE$span$46" class="ps-link-wrapper" role="presentation"><a id="PTSTITLE$46" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" role="menuitem" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'PTSTITLE$46');">Title</a></span>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li class="ps_grid-row ps_box-menuitem" id="PTS_INTELLISRCH_RS$0_row_47" role="presentation">
                                                                                        <div role="presentation" class="ps_box-link pts_result_link" id="win4hdrdivPTSTITLE$47">
                                                                                            <span id="PTSTITLE$span$47" class="ps-link-wrapper" role="presentation"><a id="PTSTITLE$47" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" role="menuitem" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'PTSTITLE$47');">Title</a></span>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li class="ps_grid-row ps_box-menuitem" id="PTS_INTELLISRCH_RS$0_row_48" role="presentation">
                                                                                        <div role="presentation" class="ps_box-link pts_result_link" id="win4hdrdivPTSTITLE$48">
                                                                                            <span id="PTSTITLE$span$48" class="ps-link-wrapper" role="presentation"><a id="PTSTITLE$48" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" role="menuitem" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'PTSTITLE$48');">Title</a></span>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li class="ps_grid-row ps_box-menuitem" id="PTS_INTELLISRCH_RS$0_row_49" role="presentation">
                                                                                        <div role="presentation" class="ps_box-link pts_result_link" id="win4hdrdivPTSTITLE$49">
                                                                                            <span id="PTSTITLE$span$49" class="ps-link-wrapper" role="presentation"><a id="PTSTITLE$49" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" role="menuitem" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'PTSTITLE$49');">Title</a></span>
                                                                                        </div>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class=" ps_actions_cont" id="win4hdrdivPT_ACTION_CONT">
                                        <div class=" ps_custom_cont  ps_target-custright" id="win4hdrdivPT_CUSTOM_RIGHT"></div>
                                        <div class=" ps_system_cont" id="win4hdrdivPTLAYOUT_HEADER_GROUPBOX6">
                                            <div class="ps_box-group psc_layout ps_header_button ps_search-custom psc_hide-BP3" id="win4hdrdivPT_CUSTOM_SEARCH"></div>
                                            <div class="ps_box-button psc_image_only psc_toolaction-home ps_header_button ps_header-home psc_hide-BP2" id="win4hdrdivPT_HOME"><span class="ps-button-wrapper" title="Home"><a id="PT_HOME" class="ps-button" role="button" href="javascript:DoHome('https://studentadmin.manchester.ac.uk/psc/CSPROD_4/EMPLOYEE/SA/s/WEBLIB_PTBR.ISCRIPT1.FieldFormula.IScript_StartPage')" onclick="javascript:cancelBubble(event);"><img src="https://studentadmin.manchester.ac.uk/cs/CSPROD/cache/PT_HEADER_HOME_1.svg" id="PT_HOME$IMG" class="ps-img" alt="Home"></a></span></div>
                                            <div class=" ps_header_button psc_header-all" id="win4hdrdiv$ICField54">
                                                <div class="ps_box-group psc_has_popup ps_box-button  psc_menu-act  ps_header_button psc_header-all psc_image_only" id="win4hdrdivPT_ACTION_MENU"><span class="ps-button-wrapper" title="Actions"><a class="ps-button" role="button" id="PT_ACTION_MENU$PIMG" onclick="javascript:cancelBubble(event);" aria-haspopup="true" href="javascript:submitAction_win4(document.win4,'PT_ACTION_MENU');"><span class="ps-text">Actions</span><img class="ps-img" src="https://studentadmin.manchester.ac.uk/cs/CSPROD/cache/PT_HEADER_ACTIONS_1.svg" alt=""></a></span>
                                                    <div class="psc_hidden" options="sPopupParentId@PT_ACTION_MENU$PIMG;bPIA@1;bPopup@1;bMask@0;bClose@1;bHeader@1;bCache@1;sStyle@ps_popup-menu ps_menutype-act;sTitle@Actions List Popup;bAutoClose@1;bMask@1;sMaskStyle@ps_masktrans;bVertical@1;bHeader@0;bPopupMenu@1;" id="PT_ACTION_MENU$divpop">
                                                        <div class="ps_content-group" id="win4hdrdivPT_ACTION_MENUgrp" onscroll="doScroll(this, false);">
                                                            <ul role="menu" class="ps_box-group ps_box-menucontainer pt_keynav-list ps_menucontainer" id="win4hdrdiv$ICField13">
                                                                <li role="presentation" class=" ps_custom_action ps_menusection " id="win4hdrdivPT_CUSTOM_ACTION"></li>
                                                                <li role="presentation" class="  ps_search_action ps_menusection " id="win4hdrdivPT_SEARCH_ACTION"></li>
                                                                <li role="presentation" class=" ps_ag_action ps_menusection " id="win4hdrdivPT_ACTGUIDE_ACTION"></li>
                                                                <li role="presentation" class="ps_box-group psc_layout ps_system_action ps_menusection" id="win4hdrdivPT_SYSTEM_ACTION">
                                                                    <ul role="presentation" class="ps_box-group psc_layout" id="win4hdrdivPT_SYSACT_CONT">
                                                                        <li role="presentation" class="ps_box-group ps_box-menuitem ps_header-previous ps_menuitem psc_hidden" id="win4hdrdivPT_SYSACT_PRVLST">
                                                                            <div role="presentation" class="ps_box-link psc_toolaction-previnlist" id="win4hdrdivPT_PREVINLIST"><span id="PT_PREVINLIST$span" class="ps-link-wrapper" role="presentation"><a id="PT_PREVINLIST" class="ps-link" ptlinktgt="pt_replace" tabindex="-1" role="menuitem" href="javascript:DoPrevInList(this)" onclick="javascript:cancelBubble(event);">Previous
                                                                                        In List</a></span></div>
                                                                        </li>
                                                                        <li role="presentation" class="ps_box-group ps_box-menuitem ps_header-next ps_menuitem  psc_hidden" id="win4hdrdivPT_SYSACT_NXTLST">
                                                                            <div role="presentation" class="ps_box-link psc_toolaction-nextinlist" id="win4hdrdivPT_NEXTINLIST"><span id="PT_NEXTINLIST$span" class="ps-link-wrapper" role="presentation"><a id="PT_NEXTINLIST" class="ps-link" ptlinktgt="pt_replace" tabindex="-1" role="menuitem" href="javascript:DoNextInList(this)" onclick="javascript:cancelBubble(event);">Next
                                                                                        In List</a></span></div>
                                                                        </li>
                                                                        <li role="presentation" class="ps_box-group ps_box-menuitem ps_header-retlist ps_menuitem " id="win4hdrdivPT_SYSACT_RETLST"></li>
                                                                        <li role="presentation" class="ps_box-group ps_box-menuitem ps_menuitem ptpn_share" id="win4hdrdivPT_SYSACT_SHARE"></li>
                                                                        <li role="presentation" class="ps_box-group ps_box-menuitem ps_header-newwin ps_menuitem" id="win4hdrdivPT_SYSACT_NEWWIN">
                                                                            <div role="presentation" class="ps_box-link psc_toolaction-newwin" id="win4hdrdivPT_NEWWIN_MENU"><span id="PT_NEWWIN_MENU$span" class="ps-link-wrapper" role="presentation"><a id="PT_NEWWIN_MENU" class="ps-link" ptlinktgt="pt_replace" tabindex="-1" role="menuitem" href="javascript:processing_win4(0,3000); void DoNewWindowFL(this)" onclick="javascript:cancelBubble(event);">New
                                                                                        Window</a></span></div>
                                                                        </li>
                                                                        <li role="presentation" class="ps_box-group ps_box-menuitem ps_header-home ps_menuitem psc_show-BP2" id="win4hdrdivPT_SYSACT_HOME">
                                                                            <div role="presentation" class="ps_box-link psc_toolaction-home" id="win4hdrdivPT_HOME_MENU"><span id="PT_HOME_MENU$span" class="ps-link-wrapper" role="presentation"><a id="PT_HOME_MENU" class="ps-link" ptlinktgt="pt_replace" tabindex="-1" role="menuitem" href="javascript:DoHome('https://studentadmin.manchester.ac.uk/psc/CSPROD_4/EMPLOYEE/SA/s/WEBLIB_PTBR.ISCRIPT1.FieldFormula.IScript_StartPage')" onclick="javascript:cancelBubble(event);">Home</a></span>
                                                                            </div>
                                                                        </li>
                                                                        <li role="presentation" class="ps_box-group ps_box-menuitem ps_header-gsearch ps_menuitem psc_show-BP3" id="win4hdrdivPT_SYSACT_GBLSRCH"></li>
                                                                        <li role="presentation" class="ps_box-group ps_box-menuitem ps_header-addhp ps_menuitem" id="win4hdrdivPT_SYSACT_ADDHP">
                                                                            <div role="presentation" class="ps_box-link" id="win4hdrdivPT_ADDHP_MENU"><span id="PT_ADDHP_MENU$span" class="ps-link-wrapper" role="presentation"><a id="PT_ADDHP_MENU" class="ps-link" href="javascript:PTPinTo.SavePin('LP');" ptlinktgt="pt_peoplecode" tabindex="-1" role="menuitem" onclick="javascript:cancelBubble(event);">Add
                                                                                        to Homepage</a></span></div>
                                                                        </li>
                                                                        <li role="presentation" class="ps_box-group ps_box-menuitem ps_header-addnb ps_menuitem" id="win4hdrdivPT_SYSACT_ADDNB">
                                                                            <div role="presentation" class="ps_box-link" id="win4hdrdivPT_ADDNB_MENU"><span id="PT_ADDNB_MENU$span" class="ps-link-wrapper" role="presentation"><a id="PT_ADDNB_MENU" class="ps-link" href="javascript:PTPinTo.SavePin('NB');" ptlinktgt="pt_peoplecode" tabindex="-1" role="menuitem" onclick="javascript:cancelBubble(event);">Add
                                                                                        to NavBar</a></span></div>
                                                                        </li>
                                                                        <li role="presentation" class="ps_box-group ps_box-menuitem ps_header-addfav ps_menuitem" id="win4hdrdivPT_SYSACT_ADDFAV">
                                                                            <div role="presentation" class="ps_box-link" id="win4hdrdivPT_ADDFAV_MENU"><span id="PT_ADDFAV_MENU$span" class="ps-link-wrapper" role="presentation"><a id="PT_ADDFAV_MENU" class="ps-link" href="javascript:PTPinTo.SavePin('FAV');" ptlinktgt="pt_peoplecode" tabindex="-1" role="menuitem" onclick="javascript:cancelBubble(event);">Add
                                                                                        to Favorites</a></span></div>
                                                                        </li>
                                                                        <li role="presentation" class="ps_box-group ps_box-menuitem ps_header-navbar ps_menuitem psc_show-BP4" id="win4hdrdivPT_SYSACT_NAVBAR">
                                                                            <div role="presentation" class="ps_box-link psc_toolaction-navbar" id="win4hdrdivPT_NAVBAR_MENU"><span id="PT_NAVBAR_MENU$span" class="ps-link-wrapper" role="presentation"><a id="PT_NAVBAR_MENU" class="ps-link" onclick="javascript:cancelBubble(event);" href="javascript:DoNavBar(&quot;https://studentadmin.manchester.ac.uk/psc/CSPROD_newwin/EMPLOYEE/SA/c/NUI_FRAMEWORK.PTNUI_NAVBAR.GBL?ICDoModelessIframe=1&quot;);" ptlinktgt="pt_replace" tabindex="-1" role="menuitem">NavBar</a></span>
                                                                            </div>
                                                                        </li>
                                                                        <li role="presentation" class="ps_box-group ps_box-menuitem ps_header-mcfconsole ps_menuitem" id="win4hdrdivPT_SYSACT_MCF"></li>
                                                                        <li role="presentation" class="ps_box-group ps_box-menuitem ps_header-mypref ps_menuitem" id="win4hdrdivPT_SYSACT_MYPREF">
                                                                            <div role="presentation" class="ps_box-link" id="win4hdrdivPT_MY_PREFERENCES"><span id="PT_MY_PREFERENCES$span" class="ps-link-wrapper" role="presentation"><a id="PT_MY_PREFERENCES" class="ps-link" href="javascript:DoURLWarning('https://studentadmin.manchester.ac.uk/psc/CSPROD_4/EMPLOYEE/SA/c/PTGP_MENU.PTGP_USERPREF_FL.GBL?CONTEXTIDPARAMS=PSFT_CS---SSR_MD_ACAD_REC_FL')" ptlinktgt="pt_peoplecode" tabindex="-1" role="menuitem" onclick="javascript:cancelBubble(event);">My
                                                                                        Preferences</a></span></div>
                                                                        </li>
                                                                        <li role="presentation" class="ps_box-group ps_box-menuitem ps_header-access ps_menuitem" id="win4hdrdivPT_SYSACT_ACCESS"></li>
                                                                        <li role="presentation" class="ps_box-group ps_box-menuitem ps_menuitem" id="win4hdrdivPT_SYSACT_PPM">
                                                                            <div role="presentation" class="ps_box-link" id="win4hdrdivPT_PPMCONSOLE_MENU"><span id="PT_PPMCONSOLE_MENU$span" class="ps-link-wrapper" role="presentation"><a id="PT_PPMCONSOLE_MENU" class="ps-link" href="javascript:PopupPPMConsole(0, 0, 350, 240);" ptlinktgt="pt_peoplecode" tabindex="-1" role="menuitem" onclick="javascript:cancelBubble(event);">Performance
                                                                                        Trace</a></span></div>
                                                                        </li>
                                                                        <li role="presentation" class="ps_box-group ps_box-menuitem ps_header-help ps_menuitem" id="win4hdrdivPT_SYSACT_HELP">
                                                                            <div role="presentation" class="ps_box-link psc_toolaction-help" id="win4hdrdivPT_HELP_MENU"><span id="PT_HELP_MENU$span" class="ps-link-wrapper" role="presentation"><a id="PT_HELP_MENU" class="ps-link" ptlinktgt="pt_replace" tabindex="-1" role="menuitem" href="javascript:DoHelp('PeopleSoft Online Help')" onclick="javascript:cancelBubble(event);">Help</a></span>
                                                                            </div>
                                                                        </li>
                                                                        <li role="presentation" class="ps_box-group ps_box-menuitem ps_header-logout ps_menuitem" id="win4hdrdivPT_SYSACT_LOGOUT">
                                                                            <div role="presentation" class="ps_box-link psc_toolaction-logout" id="win4hdrdivPT_LOGOUT_MENU"><span id="PT_LOGOUT_MENU$span" class="ps-link-wrapper" role="presentation"><a id="PT_LOGOUT_MENU" class="ps-link" ptlinktgt="pt_replace" tabindex="-1" role="menuitem" href="javascript:DoLogout('https://studentadmin.manchester.ac.uk/psp/CSPROD_4/EMPLOYEE/SA/?cmd=logout')" onclick="javascript:cancelBubble(event);">Sign
                                                                                        Out</a></span></div>
                                                                        </li>
                                                                    </ul>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="ps_box-button psc_image_only psc_toolaction-navbar ps_header_button hdrnbbtn ps_header-navbar psc_hide-BP4" id="win4hdrdivPT_NAVBAR"><span class="ps-button-wrapper" title="NavBar"><a id="PT_NAVBAR" class="ps-button" onclick="javascript:cancelBubble(event);" href="javascript:DoNavBar(&quot;https://studentadmin.manchester.ac.uk/psc/CSPROD_newwin/EMPLOYEE/SA/c/NUI_FRAMEWORK.PTNUI_NAVBAR.GBL?ICDoModelessIframe=1&quot;);" role="button"><img src="https://studentadmin.manchester.ac.uk/cs/CSPROD/cache/PT_HEADER_NAVBAR_1.svg" id="PT_NAVBAR$IMG" class="ps-img" alt="NavBar"></a></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class=" ps_pagetitle_cont" id="win4hdrdivPT_TITLE_CONT1">
                                    <div class=" ps_system_cont  ps_target-title" id="win4hdrdivPT_PAGETITLE1">
                                        <h1 id="PT_PAGETITLE1" class="ps_pagetitle"><span class="ps-text" id="PT_PAGETITLE1lbl">Academic Records</span></h1>
                                    </div>
                                    <div class=" ps_custom_cont ps_target-custmiddle" id="win4hdrdivPT_CUSTOM_MIDDLE1">
                                    </div>
                                    <div class=" ps_context_cont" id="win4hdrdiv$ICField83">
                                        <div class="ps_box-group psc_has_popup ps_box-button  psc_menu-act psc_image_only psc_button-transparent psc_image-nomaxheight psc_force-hidden" id="win4hdrdivPT_CONTEXT_MENU"><span class="ps-button-wrapper" title="More Actions"><a class="ps-button" role="button" id="PT_CONTEXT_MENU$PIMG" onclick="javascript:cancelBubble(event);" aria-haspopup="true" href="javascript:submitAction_win4(document.win4,'PT_CONTEXT_MENU');"><span class="ps-text">More Actions</span><img class="ps-img" src="https://studentadmin.manchester.ac.uk/cs/CSPROD/cache/PT_CONTEXT_MENU_ICN_1.SVG" alt=""></a></span>
                                            <div class="psc_hidden" options="sPopupParentId@PT_CONTEXT_MENU$PIMG;bPIA@1;bPopup@1;bMask@0;bClose@1;bHeader@1;bCache@1;sStyle@ps_popup-menu ps_menutype-act;bAutoClose@1;bMask@1;bVertical@1;bHeader@0;bPopupMenu@1;" id="PT_CONTEXT_MENU$divpop">
                                                <div class="ps_content-group" id="win4hdrdivPT_CONTEXT_MENUgrp" onscroll="doScroll(this, false);">
                                                    <ul role="menu" class="ps_box-group ps_box-menucontainer pt_keynav-list ps_menucontainer" id="win4hdrdiv$ICField$14$">
                                                        <li role="presentation" class=" ps_custom_action ps_menusection " id="win4hdrdivPT_CUSTOM_ACTION1"></li>
                                                        <li role="presentation" class="  ps_search_action ps_menusection " id="win4hdrdivPT_SEARCH_ACTION1"></li>
                                                        <li role="presentation" class=" ps_ag_action ps_menusection " id="win4hdrdivPT_ACGUIDE_ACTION1"></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="ps_box-group psc_layout ps_header_confirmation" id="win4hdrdivPT_CONFIRM_CONT">
                                <div role="alert" aria-live="assertive" class="ps_box-group psc_layout psc_confirmation-animate " id="win4hdrdivPT_CONFIRMATION">
                                    <div class="ps_box-group psc_layout psc_confirmation-area" id="win4hdrdivPT_CONFIRM_AREA">
                                        <div class="ps_box-longedit psc_disabled psc_wrappable psc_has_value psc_confirmation-msg" id="win4hdrdivPT_CONFIRM_MSG">
                                            <div class="ps_box-label" id="win4hdrdivPT_CONFIRM_MSGlbl"><span class="ps-label">&nbsp;</span></div><span class="ps_box-value" id="PT_CONFIRM_MSG">&nbsp;</span>
                                        </div>
                                        <div class="ps_box-button psc_image_only psc_modal-close psc_confirmation-close" id="win4hdrdivPT_CONFIRM_CLOSE"><span class="ps-button-wrapper" title="Close"><a id="PT_CONFIRM_CLOSE" class="ps-button" role="button" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'PT_CONFIRM_CLOSE');"><img src="https://studentadmin.manchester.ac.uk/cs/CSPROD/cache/PT_MODAL_CLOSE_NUI_1.svg" id="PT_CONFIRM_CLOSE$IMG" class="ps-img" alt="Close"></a></span></div>
                                    </div>
                                </div>
                            </div>
                            <div class="ps_box-group psc_layout ps_ag-processheader" id="win4hdrdivPT_AG_LAYOUT_PT_AG_GROUPBOX3"></div>
                            <div class=" ps_header_bar_custom ps_target-custbottom" id="win4hdrdivPT_CUSTOM_BOTTOM">
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="ps_search psc_close" id="PT_SEARCH"></div>
            <div class="ps_box-pagetabs psc_hidden" id="win4divPSPANELTABS"></div>
<!--
            <DIV class='ps_mid_section' id='PT_MID_SECTION'>
                <DIV class='pst_panel-side1' id='PT_SIDE'>
                    <div class='pst_panel-control' id='PT_SIDE0'>
                        <div class='pst_panel-tabcontainer' id='PT_SIDE$tab'>
                            <div class='ps_box-button psc_image_only pst_panel-button' id='PT_SIDE$tab$buttton'><span
                                    class='ps-button-wrapper' title='Academic Records'><a class='ps-button'
                                        role='button' id='PT_SIDE$PIMG' onclick='javascript:cancelBubble(event);'
                                        href="javascript:toggleSideTab('PT_SIDE$PIMG',1);"><img class='ps-img'
                                            src='https://studentadmin.manchester.ac.uk/cs/CSPROD/cache/PT_PANEL_TAB_ICON_1.svg' alt=''><span
                                            class='ps-text'>Academic Records</span></a></span></div>
                        </div>
                        <div class='pst_panel-content' id='PT_SIDE$content'>
                            <DIV class='pst_panel-side1-top' id='PT_SIDE_TOP0'>
                                <div class='ps_detail-group' id='PT_SIDE_TOP'>
                                    <h2 class='ps_header-group psc_side1 psc_hidden'><a class='ps-link'
                                            id='PT_SIDE_TOP0$h'></a></h2>
                                    <DIV class='ps_pspagecontainer_side_md' id='win4divPSPAGECONTAINER_SIDE_MD'>
                                        <div class='ps_box-group psc_layout  psc_page-container'
                                            id='win4sidedivSCC_LO_FL_WRK_SCC_GROUP_BOX_6'>
                                            <div class='ps_box-group psc_layout  ps_masterlist-group psc_page-container'
                                                id='win4sidedivSCC_LO_FL_WRK_SCC_GROUP_BOX_5'>
                                                <DIV id='win4sidegroupletSCC_LO_FL_WRK_SCC_GROUP_BOX_5'
                                                    class='ps_box-grouplet'>
                                                    <div id='win4sideSCC_LO_FL_WRK_SCC_GROUP_BOX_5$img_psc_processing'
                                                        class='psc_processing'><img class='ps-img'
                                                            id='win4sideSCC_LO_FL_WRK_SCC_GROUP_BOX_5$processing'
                                                            src='https://studentadmin.manchester.ac.uk/cs/CSPROD/cache/PT_PROCESSING_FMODE_1.gif' alt='' />
                                                    </div>
                                                </DIV>
                                            </div>
                                        </div>
                                    </DIV>
                                </div>
                            </DIV>
                            <DIV class='pst_panel-side1-bottom psc_hidden' id='PT_SIDE_BOTTOM'></DIV>
                        </div>
                    </div>
                </DIV>-->
                <div class="ps_content" id="PT_CONTENT" role="main">
                    <div class="ps_main" id="PT_MAIN">
                        <div class="ps_pagecontainer" id="win4divPAGECONTAINER">
                            <div class="ps_pspagecontainer_md" id="win4divPSPAGECONTAINER_MD">
                                <div class="ps_box-group ps_ag-targetcontent" id="divPAGECONTAINER_TGT">
                                    <div class="ps_box-group psc_layout ps_apps_content" id="win4div$ICField1"><div class="ps_box-group psc_layout" id="win4div$ICField4"><div class="ps_box-group ps_box-title ps_box-mdtitle psa_pagetitle" id="win4divPANEL_TITLE"><h1 id="PANEL_TITLE" class="ps_pagetitle"><span class="ps-text" id="PANEL_TITLElbl">Grade Details</span></h1></div><div class="ps_box-group psc_layout psa_pageaction" id="win4div$ICField5"></div></div><div class="ps_box-group psc_layout psc_float-clear" id="win4div$ICField$7$"><div class="ps_box-group psc_layout" id="win4div$ICField47"><div class="ps_box-group psc_layout" id="win4divDERIVED_ACRD_FL_SSR_DISPLY_GPA_GBX"><div class="ps_box-group psc_layout  psa_list-grid-anchor" id="win4divDERIVED_ACRD_FL_GROUPBOX1"><div class="ps_box-group psc_layout  ps_box-grid-list" id="win4divDERIVED_ACRD_FL_GROUPBOX"><div class="ps_box-grid-flex psc_grid-nohbar psa_cum-gpa psa_bottom-none-anchor psc_show-actionable" id="win4divCUM_GPA$0"><div class="ps_box-grid-header" id="win4divCUM_GPAhdr$0"><div class="ps_box-grid-title"></div><div class="ps_box-grid-header_bar"></div></div><div class="ps_box-gridc" id="win4divCUM_GPAgridc$0"><div class="ps_box-gridc-right" id="win4divCUM_GPAgridc-right$0"><div class="ps_box-grid" id="win4divCUM_GPA$grid$0"><table class="ps_grid-flex" role="presentation"><tbody class="ps_grid-body"><tr class="ps_grid-row psc_rowact" id="CUM_GPA$0_row_0" tabindex="0" data-role="button" onclick="javascript:OnRowAction(this,'DERIVED_ACRD_FL_DESCRFORMAL$0');cancelBubble(event);">
                                        <td class="ps_grid-cell psc_trigger">
                                        <div class="ps_box-link psc_trigger psc_trigger  ps_box-label ps-label psa_bold-anchor psa_overflow" id="win4divDERIVED_ACRD_FL_DESCRFORMAL$0"><span id="DERIVED_ACRD_FL_DESCRFORMAL$span$0" class="ps-link-wrapper" title="Overall Year Mark "><a id="DERIVED_ACRD_FL_DESCRFORMAL$0" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'DERIVED_ACRD_FL_DESCRFORMAL$0');">Overall Year Mark</a></span></div></td>
                                        <td class="ps_grid-cell">
                                        <div class="ps_box-edit psc_disabled psc_label-suppressed psc_has_value  psc_label-none psc_inline  psa_bold-anchor" id="win4divDERIVED_ACRD_FL_DESCR50$0"><span class="ps_box-value" id="DERIVED_ACRD_FL_DESCR50$0">73.268</span>
                                        </div></td>
                                        <td class="ps_grid-cell">
                                        <div class="ps_box-edit psc_disabled psc_label-suppressed psc_has_value psc_more psc_label-none" id="win4divDERIVED_ACRD_FL_SSR_SCRTAB_MORE$0"><span class="ps_box-value" id="DERIVED_ACRD_FL_SSR_SCRTAB_MORE$0">&nbsp;</span>
                                        </div></td>
                                        </tr>
                                        <tr class="ps_grid-row psc_rowact psc_disabled" id="CUM_GPA$0_row_1">
                                        <td class="ps_grid-cell psc_trigger">
                                        <div class="ps_box-link psc_trigger psc_disabled psc_trigger  ps_box-label ps-label psa_bold-anchor psa_overflow" id="win4divDERIVED_ACRD_FL_DESCRFORMAL$1"><span id="DERIVED_ACRD_FL_DESCRFORMAL$span$1" class="ps-link-wrapper" title="Academic Standing "><a id="DERIVED_ACRD_FL_DESCRFORMAL$1" aria-disabled="true" disabled="disabled" class="ps-link" role="text" ptlinktgt="pt_peoplecode" tabindex="-1">Student Name</a></span></div></td>
                                        <td class="ps_grid-cell">
                                        <div class="ps_box-edit psc_disabled psc_label-suppressed psc_has_value  psc_label-none psc_inline" id="win4divDERIVED_ACRD_FL_DESCR50$1"><span class="ps_box-value" id="DERIVED_ACRD_FL_DESCR50$1">${fullname}</span>
                                        </div></td>
                                        <td class="ps_grid-cell">
                                        <div class="ps_box-edit psc_disabled psc_label-suppressed psc_has_value psc_more psc_label-none" id="win4divDERIVED_ACRD_FL_SSR_SCRTAB_MORE$1"><span class="ps_box-value" id="DERIVED_ACRD_FL_SSR_SCRTAB_MORE$1">&nbsp;</span>
                                        </div></td>
                                        </tr>
                                        </tbody></table>
                                        </div></div></div></div></div></div></div><div class="ps_box-group psc_layout  psa_list-grid-anchor" id="win4divDERIVED_ACRD_FL_GROUPBOX2"><div class="ps_box-grid-flex psc_grid-nohbar psa_border-bottom-none-anchor psa_text-align-left psc_show-actionable psc_grid-selectedhighlight" id="win4divTERM_CLASSES$0"><div class="ps_box-grid-header" id="win4divTERM_CLASSEShdr$0"><div class="ps_box-grid-title"><div class="ps_box-text psc_rowcount" id="win4divTERM_CLASSESrowcnt$0"><span class="ps-text">14 rows</span></div></div><div class="ps_box-grid-header_bar"></div></div><div class="ps_box-gridc" id="win4divTERM_CLASSESgridc$0"><div class="ps_box-gridc-right" id="win4divTERM_CLASSESgridc-right$0"><div class="ps_box-grid" id="win4divTERM_CLASSES$grid$0"><table class="ps_grid-flex"><thead class="ps_grid-head"><tr class="ps_grid-head-row">
                                        <th scope="col" class="ps_grid-col SSR_CLASS_BTN psc_trigger"><div class="ps_box_grid-col"><div class="ps_grid-col-label" id="win4divSSR_CLASS_BTNlblhdr$0">Class</div></div></th><th scope="col" class="ps_grid-col psc_num"><div class="ps_box_grid-col"><div class="ps_grid-col-label" id="win4divSTDNT_ENRL_SSV1_UNT_TAKENlblhdr$0">Units</div></div></th><th scope="col" class="ps_grid-col GRADING_BASIS"><div class="ps_box_grid-col"><div class="ps_grid-col-label" id="win4divGRADING_BASISlblhdr$0">Grading</div></div></th><th scope="col" class="ps_grid-col"><div class="ps_box_grid-col"><div class="ps_grid-col-label" id="win4divSTDNT_ENRL_SSV1_CRSE_GRADE_OFFlblhdr$0">Grade</div></div></th><th scope="col" class="ps_grid-col CLS_NOTES"><div class="ps_box_grid-col"><div class="ps_grid-col-label" id="win4divCLS_NOTESlblhdr$0">Notes</div></div></th><th scope="col" class="ps_grid-col"><div class="ps_box_grid-col"></div></th></tr></thead>
                                        <tbody class="ps_grid-body"><tr class="ps_grid-row psc_rowact" id="TERM_CLASSES$0_row_0" tabindex="0" data-role="button" onclick="javascript:OnRowAction(this,'SSR_CLASS_BTN$0');cancelBubble(event);">
                                        <td class="ps_grid-cell SSR_CLASS_BTN psc_trigger">
                                        <div class="ps_box-link psc_trigger psc_trigger psa_bold-anchor psc_wrap" id="win4divSSR_CLASS_BTN$0"><span id="SSR_CLASS_BTN$span$0" class="ps-link-wrapper" title="Academic Tutorials Year 1"><a id="SSR_CLASS_BTN$0" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'SSR_CLASS_BTN$0');">BIOL 10000</a></span></div></td>
                                        <td class="ps_grid-cell psc_num">
                                        <div class="ps_box-edit psc_disabled psc_has_value psc_num  psc_label-hide" id="win4divSTDNT_ENRL_SSV1_UNT_TAKEN$0"><div class="ps_box-label" id="win4divSTDNT_ENRL_SSV1_UNT_TAKENlbl$0"><span class="ps-label">Units</span></div><span class="ps_box-value" id="STDNT_ENRL_SSV1_UNT_TAKEN$0">10.00</span>
                                        </div></td>
                                        <td class="ps_grid-cell GRADING_BASIS">
                                        <div class="ps_box-edit psc_disabled psc_has_value  psc_label-hide" id="win4divGRADING_BASIS$0"><div class="ps_box-label" id="win4divGRADING_BASISlbl$0"><span class="ps-label">Grading</span></div><span class="ps_box-value" id="GRADING_BASIS$0">Pass or Fail Grade Basis</span>
                                        </div></td>
                                        <td class="ps_grid-cell">
                                        <div class="ps_box-edit psc_disabled psc_has_value  psc_label-hide" id="win4divSTDNT_ENRL_SSV1_CRSE_GRADE_OFF$0"><div class="ps_box-label" id="win4divSTDNT_ENRL_SSV1_CRSE_GRADE_OFFlbl$0"><span class="ps-label">Grade</span></div><span class="ps_box-value" id="STDNT_ENRL_SSV1_CRSE_GRADE_OFF$0">P</span>
                                        </div></td>
                                        <td class="ps_grid-cell psc_num">
                                        <div class="ps_box-edit psc_disabled psc_has_value psc_num  psc_label-hide" id="win4divSTDNT_ENRL_SSV1_GRADE_POINTS$0"><div class="ps_box-label" id="win4divSTDNT_ENRL_SSV1_GRADE_POINTSlbl$0"><span class="ps-label">Grade Points</span></div><span class="ps_box-value" id="STDNT_ENRL_SSV1_GRADE_POINTS$0">&nbsp;</span>
                                        </div></td>
                                        
                                        <td class="ps_grid-cell">
                                        <div class="ps_box-edit psc_disabled psc_label-suppressed psc_has_value psc_more psc_label-none" id="win4divDERIVED_SSR_FL_SSR_SCRTAB_MORE$0"><span class="ps_box-value" id="DERIVED_SSR_FL_SSR_SCRTAB_MORE$0">&nbsp;</span>
                                        </div></td>
                                        </tr>
                                        <tr class="ps_grid-row psc_rowact" id="TERM_CLASSES$0_row_1" tabindex="0" data-role="button" onclick="javascript:OnRowAction(this,'SSR_CLASS_BTN$1');cancelBubble(event);">
                                        <td class="ps_grid-cell SSR_CLASS_BTN psc_trigger">
                                        <div class="ps_box-link psc_trigger psc_trigger psa_bold-anchor psc_wrap" id="win4divSSR_CLASS_BTN$1"><span id="SSR_CLASS_BTN$span$1" class="ps-link-wrapper" title="Biochemistry"><a id="SSR_CLASS_BTN$1" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'SSR_CLASS_BTN$1');">BIOL 10212</a></span></div></td>
                                        <td class="ps_grid-cell psc_num">
                                        <div class="ps_box-edit psc_disabled psc_has_value psc_num  psc_label-hide" id="win4divSTDNT_ENRL_SSV1_UNT_TAKEN$1"><div class="ps_box-label" id="win4divSTDNT_ENRL_SSV1_UNT_TAKENlbl$1"><span class="ps-label">Units</span></div><span class="ps_box-value" id="STDNT_ENRL_SSV1_UNT_TAKEN$1">10.00</span>
                                        </div></td>
                                        <td class="ps_grid-cell GRADING_BASIS">
                                        <div class="ps_box-edit psc_disabled psc_has_value  psc_label-hide" id="win4divGRADING_BASIS$1"><div class="ps_box-label" id="win4divGRADING_BASISlbl$1"><span class="ps-label">Grading</span></div><span class="ps_box-value" id="GRADING_BASIS$1">Undergraduate Grade Basis</span>
                                        </div></td>
                                        <td class="ps_grid-cell">
                                        <div class="ps_box-edit psc_disabled psc_has_value  psc_label-hide" id="win4divSTDNT_ENRL_SSV1_CRSE_GRADE_OFF$1"><div class="ps_box-label" id="win4divSTDNT_ENRL_SSV1_CRSE_GRADE_OFFlbl$1"><span class="ps-label">Grade</span></div><span class="ps_box-value" id="STDNT_ENRL_SSV1_CRSE_GRADE_OFF$1">A</span>
                                        </div></td>
                                        
                                        <td class="ps_grid-cell CLS_NOTES">
                                        <div class="ps_box-edit psc_disabled psc_label-suppressed psc_has_value" id="win4divCLS_NOTES$1"><span class="ps_box-value" id="CLS_NOTES$1">&nbsp;</span>
                                        </div></td>
                                        <td class="ps_grid-cell">
                                        <div class="ps_box-edit psc_disabled psc_label-suppressed psc_has_value psc_more psc_label-none" id="win4divDERIVED_SSR_FL_SSR_SCRTAB_MORE$1"><span class="ps_box-value" id="DERIVED_SSR_FL_SSR_SCRTAB_MORE$1">&nbsp;</span>
                                        </div></td>
                                        </tr>
                                        <tr class="ps_grid-row psc_rowact" id="TERM_CLASSES$0_row_2" tabindex="0" data-role="button" onclick="javascript:OnRowAction(this,'SSR_CLASS_BTN$2');cancelBubble(event);">
                                        <td class="ps_grid-cell SSR_CLASS_BTN psc_trigger">
                                        <div class="ps_box-link psc_trigger psc_trigger psa_bold-anchor psc_wrap" id="win4divSSR_CLASS_BTN$2"><span id="SSR_CLASS_BTN$span$2" class="ps-link-wrapper" title="Molecular Biology"><a id="SSR_CLASS_BTN$2" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'SSR_CLASS_BTN$2');">BIOL 10221</a></span></div></td>
                                        <td class="ps_grid-cell psc_num">
                                        <div class="ps_box-edit psc_disabled psc_has_value psc_num  psc_label-hide" id="win4divSTDNT_ENRL_SSV1_UNT_TAKEN$2"><div class="ps_box-label" id="win4divSTDNT_ENRL_SSV1_UNT_TAKENlbl$2"><span class="ps-label">Units</span></div><span class="ps_box-value" id="STDNT_ENRL_SSV1_UNT_TAKEN$2">10.00</span>
                                        </div></td>
                                        <td class="ps_grid-cell GRADING_BASIS">
                                        <div class="ps_box-edit psc_disabled psc_has_value  psc_label-hide" id="win4divGRADING_BASIS$2"><div class="ps_box-label" id="win4divGRADING_BASISlbl$2"><span class="ps-label">Grading</span></div><span class="ps_box-value" id="GRADING_BASIS$2">Undergraduate Grade Basis</span>
                                        </div></td>
                                        <td class="ps_grid-cell">
                                        <div class="ps_box-edit psc_disabled psc_has_value  psc_label-hide" id="win4divSTDNT_ENRL_SSV1_CRSE_GRADE_OFF$2"><div class="ps_box-label" id="win4divSTDNT_ENRL_SSV1_CRSE_GRADE_OFFlbl$2"><span class="ps-label">Grade</span></div><span class="ps_box-value" id="STDNT_ENRL_SSV1_CRSE_GRADE_OFF$2">A</span>
                                        </div></td>
                                        
                                        <td class="ps_grid-cell CLS_NOTES">
                                        <div class="ps_box-edit psc_disabled psc_label-suppressed psc_has_value" id="win4divCLS_NOTES$2"><span class="ps_box-value" id="CLS_NOTES$2">&nbsp;</span>
                                        </div></td>
                                        <td class="ps_grid-cell">
                                        <div class="ps_box-edit psc_disabled psc_label-suppressed psc_has_value psc_more psc_label-none" id="win4divDERIVED_SSR_FL_SSR_SCRTAB_MORE$2"><span class="ps_box-value" id="DERIVED_SSR_FL_SSR_SCRTAB_MORE$2">&nbsp;</span>
                                        </div></td>
                                        </tr>
                                        <tr class="ps_grid-row psc_rowact" id="TERM_CLASSES$0_row_3" tabindex="0" data-role="button" onclick="javascript:OnRowAction(this,'SSR_CLASS_BTN$3');cancelBubble(event);">
                                        <td class="ps_grid-cell SSR_CLASS_BTN psc_trigger">
                                        <div class="ps_box-link psc_trigger psc_trigger psa_bold-anchor psc_wrap" id="win4divSSR_CLASS_BTN$3"><span id="SSR_CLASS_BTN$span$3" class="ps-link-wrapper" title="From Molecules to Cells"><a id="SSR_CLASS_BTN$3" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'SSR_CLASS_BTN$3');">BIOL 10232</a></span></div></td>
                                        <td class="ps_grid-cell psc_num">
                                        <div class="ps_box-edit psc_disabled psc_has_value psc_num  psc_label-hide" id="win4divSTDNT_ENRL_SSV1_UNT_TAKEN$3"><div class="ps_box-label" id="win4divSTDNT_ENRL_SSV1_UNT_TAKENlbl$3"><span class="ps-label">Units</span></div><span class="ps_box-value" id="STDNT_ENRL_SSV1_UNT_TAKEN$3">10.00</span>
                                        </div></td>
                                        <td class="ps_grid-cell GRADING_BASIS">
                                        <div class="ps_box-edit psc_disabled psc_has_value  psc_label-hide" id="win4divGRADING_BASIS$3"><div class="ps_box-label" id="win4divGRADING_BASISlbl$3"><span class="ps-label">Grading</span></div><span class="ps_box-value" id="GRADING_BASIS$3">Undergraduate Grade Basis</span>
                                        </div></td>
                                        <td class="ps_grid-cell">
                                        <div class="ps_box-edit psc_disabled psc_has_value  psc_label-hide" id="win4divSTDNT_ENRL_SSV1_CRSE_GRADE_OFF$3"><div class="ps_box-label" id="win4divSTDNT_ENRL_SSV1_CRSE_GRADE_OFFlbl$3"><span class="ps-label">Grade</span></div><span class="ps_box-value" id="STDNT_ENRL_SSV1_CRSE_GRADE_OFF$3">B</span>
                                        </div></td>
                                        
                                        <td class="ps_grid-cell CLS_NOTES">
                                        <div class="ps_box-edit psc_disabled psc_label-suppressed psc_has_value" id="win4divCLS_NOTES$3"><span class="ps_box-value" id="CLS_NOTES$3">&nbsp;</span>
                                        </div></td>
                                        <td class="ps_grid-cell">
                                        <div class="ps_box-edit psc_disabled psc_label-suppressed psc_has_value psc_more psc_label-none" id="win4divDERIVED_SSR_FL_SSR_SCRTAB_MORE$3"><span class="ps_box-value" id="DERIVED_SSR_FL_SSR_SCRTAB_MORE$3">&nbsp;</span>
                                        </div></td>
                                        </tr>
                                        <tr class="ps_grid-row psc_rowact" id="TERM_CLASSES$0_row_4" tabindex="0" data-role="button" onclick="javascript:OnRowAction(this,'SSR_CLASS_BTN$4');cancelBubble(event);">
                                        <td class="ps_grid-cell SSR_CLASS_BTN psc_trigger">
                                        <div class="ps_box-link psc_trigger psc_trigger psa_bold-anchor psc_wrap" id="win4divSSR_CLASS_BTN$4"><span id="SSR_CLASS_BTN$span$4" class="ps-link-wrapper" title="Introduction to Laboratory Sci"><a id="SSR_CLASS_BTN$4" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'SSR_CLASS_BTN$4');">BIOL 10401</a></span></div></td>
                                        <td class="ps_grid-cell psc_num">
                                        <div class="ps_box-edit psc_disabled psc_has_value psc_num  psc_label-hide" id="win4divSTDNT_ENRL_SSV1_UNT_TAKEN$4"><div class="ps_box-label" id="win4divSTDNT_ENRL_SSV1_UNT_TAKENlbl$4"><span class="ps-label">Units</span></div><span class="ps_box-value" id="STDNT_ENRL_SSV1_UNT_TAKEN$4">10.00</span>
                                        </div></td>
                                        <td class="ps_grid-cell GRADING_BASIS">
                                        <div class="ps_box-edit psc_disabled psc_has_value  psc_label-hide" id="win4divGRADING_BASIS$4"><div class="ps_box-label" id="win4divGRADING_BASISlbl$4"><span class="ps-label">Grading</span></div><span class="ps_box-value" id="GRADING_BASIS$4">Undergraduate Grade Basis</span>
                                        </div></td>
                                        <td class="ps_grid-cell">
                                        <div class="ps_box-edit psc_disabled psc_has_value  psc_label-hide" id="win4divSTDNT_ENRL_SSV1_CRSE_GRADE_OFF$4"><div class="ps_box-label" id="win4divSTDNT_ENRL_SSV1_CRSE_GRADE_OFFlbl$4"><span class="ps-label">Grade</span></div><span class="ps_box-value" id="STDNT_ENRL_SSV1_CRSE_GRADE_OFF$4">A</span>
                                        </div></td>
                                        
                                        <td class="ps_grid-cell CLS_NOTES">
                                        <div class="ps_box-edit psc_disabled psc_label-suppressed psc_has_value" id="win4divCLS_NOTES$4"><span class="ps_box-value" id="CLS_NOTES$4"></span>
                                        </div></td>
                                        <td class="ps_grid-cell">
                                        <div class="ps_box-edit psc_disabled psc_label-suppressed psc_has_value psc_more psc_label-none" id="win4divDERIVED_SSR_FL_SSR_SCRTAB_MORE$4"><span class="ps_box-value" id="DERIVED_SSR_FL_SSR_SCRTAB_MORE$4">&nbsp;</span>
                                        </div></td>
                                        </tr>
                                        <tr class="ps_grid-row psc_rowact" id="TERM_CLASSES$0_row_5" tabindex="0" data-role="button" onclick="javascript:OnRowAction(this,'SSR_CLASS_BTN$5');cancelBubble(event);">
                                        <td class="ps_grid-cell SSR_CLASS_BTN psc_trigger">
                                        <div class="ps_box-link psc_trigger psc_trigger psa_bold-anchor psc_wrap" id="win4divSSR_CLASS_BTN$5"><span id="SSR_CLASS_BTN$span$5" class="ps-link-wrapper" title="Intro to Experimental Biol HB"><a id="SSR_CLASS_BTN$5" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'SSR_CLASS_BTN$5');">BIOL 10422</a></span></div></td>
                                        <td class="ps_grid-cell psc_num">
                                        <div class="ps_box-edit psc_disabled psc_has_value psc_num  psc_label-hide" id="win4divSTDNT_ENRL_SSV1_UNT_TAKEN$5"><div class="ps_box-label" id="win4divSTDNT_ENRL_SSV1_UNT_TAKENlbl$5"><span class="ps-label">Units</span></div><span class="ps_box-value" id="STDNT_ENRL_SSV1_UNT_TAKEN$5">10.00</span>
                                        </div></td>
                                        <td class="ps_grid-cell GRADING_BASIS">
                                        <div class="ps_box-edit psc_disabled psc_has_value  psc_label-hide" id="win4divGRADING_BASIS$5"><div class="ps_box-label" id="win4divGRADING_BASISlbl$5"><span class="ps-label">Grading</span></div><span class="ps_box-value" id="GRADING_BASIS$5">Undergraduate Grade Basis</span>
                                        </div></td>
                                        <td class="ps_grid-cell">
                                        <div class="ps_box-edit psc_disabled psc_has_value  psc_label-hide" id="win4divSTDNT_ENRL_SSV1_CRSE_GRADE_OFF$5"><div class="ps_box-label" id="win4divSTDNT_ENRL_SSV1_CRSE_GRADE_OFFlbl$5"><span class="ps-label">Grade</span></div><span class="ps_box-value" id="STDNT_ENRL_SSV1_CRSE_GRADE_OFF$5">A</span>
                                        </div></td>
                                        
                                        <td class="ps_grid-cell CLS_NOTES">
                                        <div class="ps_box-edit psc_disabled psc_label-suppressed psc_has_value" id="win4divCLS_NOTES$5"><span class="ps_box-value" id="CLS_NOTES$5">&nbsp;</span>
                                        </div></td>
                                        <td class="ps_grid-cell">
                                        <div class="ps_box-edit psc_disabled psc_label-suppressed psc_has_value psc_more psc_label-none" id="win4divDERIVED_SSR_FL_SSR_SCRTAB_MORE$5"><span class="ps_box-value" id="DERIVED_SSR_FL_SSR_SCRTAB_MORE$5">&nbsp;</span>
                                        </div></td>
                                        </tr>
                                        <tr class="ps_grid-row psc_rowact" id="TERM_CLASSES$0_row_6" tabindex="0" data-role="button" onclick="javascript:OnRowAction(this,'SSR_CLASS_BTN$6');cancelBubble(event);">
                                        <td class="ps_grid-cell SSR_CLASS_BTN psc_trigger">
                                        <div class="ps_box-link psc_trigger psc_trigger psa_bold-anchor psc_wrap" id="win4divSSR_CLASS_BTN$6"><span id="SSR_CLASS_BTN$span$6" class="ps-link-wrapper" title="Biodiversity"><a id="SSR_CLASS_BTN$6" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'SSR_CLASS_BTN$6');">BIOL 10511</a></span></div></td>
                                        <td class="ps_grid-cell psc_num">
                                        <div class="ps_box-edit psc_disabled psc_has_value psc_num  psc_label-hide" id="win4divSTDNT_ENRL_SSV1_UNT_TAKEN$6"><div class="ps_box-label" id="win4divSTDNT_ENRL_SSV1_UNT_TAKENlbl$6"><span class="ps-label">Units</span></div><span class="ps_box-value" id="STDNT_ENRL_SSV1_UNT_TAKEN$6">10.00</span>
                                        </div></td>
                                        <td class="ps_grid-cell GRADING_BASIS">
                                        <div class="ps_box-edit psc_disabled psc_has_value  psc_label-hide" id="win4divGRADING_BASIS$6"><div class="ps_box-label" id="win4divGRADING_BASISlbl$6"><span class="ps-label">Grading</span></div><span class="ps_box-value" id="GRADING_BASIS$6">Undergraduate Grade Basis</span>
                                        </div></td>
                                        <td class="ps_grid-cell">
                                        <div class="ps_box-edit psc_disabled psc_has_value  psc_label-hide" id="win4divSTDNT_ENRL_SSV1_CRSE_GRADE_OFF$6"><div class="ps_box-label" id="win4divSTDNT_ENRL_SSV1_CRSE_GRADE_OFFlbl$6"><span class="ps-label">Grade</span></div><span class="ps_box-value" id="STDNT_ENRL_SSV1_CRSE_GRADE_OFF$6">A</span>
                                        </div></td>
                                        
                                        <td class="ps_grid-cell CLS_NOTES">
                                        <div class="ps_box-edit psc_disabled psc_label-suppressed psc_has_value" id="win4divCLS_NOTES$6"><span class="ps_box-value" id="CLS_NOTES$6">&nbsp;</span>
                                        </div></td>
                                        <td class="ps_grid-cell">
                                        <div class="ps_box-edit psc_disabled psc_label-suppressed psc_has_value psc_more psc_label-none" id="win4divDERIVED_SSR_FL_SSR_SCRTAB_MORE$6"><span class="ps_box-value" id="DERIVED_SSR_FL_SSR_SCRTAB_MORE$6">&nbsp;</span>
                                        </div></td>
                                        </tr>
                                        <tr class="ps_grid-row psc_rowact" id="TERM_CLASSES$0_row_7" tabindex="0" data-role="button" onclick="javascript:OnRowAction(this,'SSR_CLASS_BTN$7');cancelBubble(event);">
                                        <td class="ps_grid-cell SSR_CLASS_BTN psc_trigger">
                                        <div class="ps_box-link psc_trigger psc_trigger psa_bold-anchor psc_wrap" id="win4divSSR_CLASS_BTN$7"><span id="SSR_CLASS_BTN$span$7" class="ps-link-wrapper" title="Genes, Evolution and Develop."><a id="SSR_CLASS_BTN$7" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'SSR_CLASS_BTN$7');">BIOL 10521</a></span></div></td>
                                        <td class="ps_grid-cell psc_num">
                                        <div class="ps_box-edit psc_disabled psc_has_value psc_num  psc_label-hide" id="win4divSTDNT_ENRL_SSV1_UNT_TAKEN$7"><div class="ps_box-label" id="win4divSTDNT_ENRL_SSV1_UNT_TAKENlbl$7"><span class="ps-label">Units</span></div><span class="ps_box-value" id="STDNT_ENRL_SSV1_UNT_TAKEN$7">10.00</span>
                                        </div></td>
                                        <td class="ps_grid-cell GRADING_BASIS">
                                        <div class="ps_box-edit psc_disabled psc_has_value  psc_label-hide" id="win4divGRADING_BASIS$7"><div class="ps_box-label" id="win4divGRADING_BASISlbl$7"><span class="ps-label">Grading</span></div><span class="ps_box-value" id="GRADING_BASIS$7">Undergraduate Grade Basis</span>
                                        </div></td>
                                        <td class="ps_grid-cell">
                                        <div class="ps_box-edit psc_disabled psc_has_value  psc_label-hide" id="win4divSTDNT_ENRL_SSV1_CRSE_GRADE_OFF$7"><div class="ps_box-label" id="win4divSTDNT_ENRL_SSV1_CRSE_GRADE_OFFlbl$7"><span class="ps-label">Grade</span></div><span class="ps_box-value" id="STDNT_ENRL_SSV1_CRSE_GRADE_OFF$7">A</span>
                                        </div></td>
                                        
                                        <td class="ps_grid-cell CLS_NOTES">
                                        <div class="ps_box-edit psc_disabled psc_label-suppressed psc_has_value" id="win4divCLS_NOTES$7"><span class="ps_box-value" id="CLS_NOTES$7">&nbsp;</span>
                                        </div></td>
                                        <td class="ps_grid-cell">
                                        <div class="ps_box-edit psc_disabled psc_label-suppressed psc_has_value psc_more psc_label-none" id="win4divDERIVED_SSR_FL_SSR_SCRTAB_MORE$7"><span class="ps_box-value" id="DERIVED_SSR_FL_SSR_SCRTAB_MORE$7">&nbsp;</span>
                                        </div></td>
                                        </tr>
                                        <tr class="ps_grid-row psc_rowact" id="TERM_CLASSES$0_row_8" tabindex="0" data-role="button" onclick="javascript:OnRowAction(this,'SSR_CLASS_BTN$8');cancelBubble(event);">
                                        <td class="ps_grid-cell SSR_CLASS_BTN psc_trigger">
                                        <div class="ps_box-link psc_trigger psc_trigger psa_bold-anchor psc_wrap" id="win4divSSR_CLASS_BTN$8"><span id="SSR_CLASS_BTN$span$8" class="ps-link-wrapper" title="Microbes, Humankind,&amp; Environm"><a id="SSR_CLASS_BTN$8" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'SSR_CLASS_BTN$8');">BIOL 10532</a></span></div></td>
                                        <td class="ps_grid-cell psc_num">
                                        <div class="ps_box-edit psc_disabled psc_has_value psc_num  psc_label-hide" id="win4divSTDNT_ENRL_SSV1_UNT_TAKEN$8"><div class="ps_box-label" id="win4divSTDNT_ENRL_SSV1_UNT_TAKENlbl$8"><span class="ps-label">Units</span></div><span class="ps_box-value" id="STDNT_ENRL_SSV1_UNT_TAKEN$8">10.00</span>
                                        </div></td>
                                        <td class="ps_grid-cell GRADING_BASIS">
                                        <div class="ps_box-edit psc_disabled psc_has_value  psc_label-hide" id="win4divGRADING_BASIS$8"><div class="ps_box-label" id="win4divGRADING_BASISlbl$8"><span class="ps-label">Grading</span></div><span class="ps_box-value" id="GRADING_BASIS$8">Undergraduate Grade Basis</span>
                                        </div></td>
                                        <td class="ps_grid-cell">
                                        <div class="ps_box-edit psc_disabled psc_has_value  psc_label-hide" id="win4divSTDNT_ENRL_SSV1_CRSE_GRADE_OFF$8"><div class="ps_box-label" id="win4divSTDNT_ENRL_SSV1_CRSE_GRADE_OFFlbl$8"><span class="ps-label">Grade</span></div><span class="ps_box-value" id="STDNT_ENRL_SSV1_CRSE_GRADE_OFF$8">A</span>
                                        </div></td>
                                        
                                        <td class="ps_grid-cell CLS_NOTES">
                                        <div class="ps_box-edit psc_disabled psc_label-suppressed psc_has_value" id="win4divCLS_NOTES$8"><span class="ps_box-value" id="CLS_NOTES$8">&nbsp;</span>
                                        </div></td>
                                        <td class="ps_grid-cell">
                                        <div class="ps_box-edit psc_disabled psc_label-suppressed psc_has_value psc_more psc_label-none" id="win4divDERIVED_SSR_FL_SSR_SCRTAB_MORE$8"><span class="ps_box-value" id="DERIVED_SSR_FL_SSR_SCRTAB_MORE$8">&nbsp;</span>
                                        </div></td>
                                        </tr>
                                        <tr class="ps_grid-row psc_rowact" id="TERM_CLASSES$0_row_9" tabindex="0" data-role="button" onclick="javascript:OnRowAction(this,'SSR_CLASS_BTN$9');cancelBubble(event);">
                                        <td class="ps_grid-cell SSR_CLASS_BTN psc_trigger">
                                        <div class="ps_box-link psc_trigger psc_trigger psa_bold-anchor psc_wrap" id="win4divSSR_CLASS_BTN$9"><span id="SSR_CLASS_BTN$span$9" class="ps-link-wrapper" title="Writing and Referencing Skills"><a id="SSR_CLASS_BTN$9" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'SSR_CLASS_BTN$9');">BIOL 10741</a></span></div></td>
                                        <td class="ps_grid-cell psc_num">
                                        <div class="ps_box-edit psc_disabled psc_has_value psc_num  psc_label-hide" id="win4divSTDNT_ENRL_SSV1_UNT_TAKEN$9"><div class="ps_box-label" id="win4divSTDNT_ENRL_SSV1_UNT_TAKENlbl$9"><span class="ps-label">Units</span></div><span class="ps_box-value" id="STDNT_ENRL_SSV1_UNT_TAKEN$9">&nbsp;</span>
                                        </div></td>
                                        <td class="ps_grid-cell GRADING_BASIS">
                                        <div class="ps_box-edit psc_disabled psc_has_value  psc_label-hide" id="win4divGRADING_BASIS$9"><div class="ps_box-label" id="win4divGRADING_BASISlbl$9"><span class="ps-label">Grading</span></div><span class="ps_box-value" id="GRADING_BASIS$9">Pass or Fail Grade Basis</span>
                                        </div></td>
                                        <td class="ps_grid-cell">
                                        <div class="ps_box-edit psc_disabled psc_has_value  psc_label-hide" id="win4divSTDNT_ENRL_SSV1_CRSE_GRADE_OFF$9"><div class="ps_box-label" id="win4divSTDNT_ENRL_SSV1_CRSE_GRADE_OFFlbl$9"><span class="ps-label">Grade</span></div><span class="ps_box-value" id="STDNT_ENRL_SSV1_CRSE_GRADE_OFF$9">P</span>
                                        </div></td>
                                        
                                        <td class="ps_grid-cell CLS_NOTES">
                                        <div class="ps_box-edit psc_disabled psc_label-suppressed psc_has_value" id="win4divCLS_NOTES$9"><span class="ps_box-value" id="CLS_NOTES$9">&nbsp;</span>
                                        </div></td>
                                        <td class="ps_grid-cell">
                                        <div class="ps_box-edit psc_disabled psc_label-suppressed psc_has_value psc_more psc_label-none" id="win4divDERIVED_SSR_FL_SSR_SCRTAB_MORE$9"><span class="ps_box-value" id="DERIVED_SSR_FL_SSR_SCRTAB_MORE$9">&nbsp;</span>
                                        </div></td>
                                        </tr>
                                        <tr class="ps_grid-row psc_rowact" id="TERM_CLASSES$0_row_10" tabindex="0" data-role="button" onclick="javascript:OnRowAction(this,'SSR_CLASS_BTN$10');cancelBubble(event);">
                                        <td class="ps_grid-cell SSR_CLASS_BTN psc_trigger">
                                        <div class="ps_box-link psc_trigger psc_trigger psa_bold-anchor psc_wrap" id="win4divSSR_CLASS_BTN$10"><span id="SSR_CLASS_BTN$span$10" class="ps-link-wrapper" title="Body Systems"><a id="SSR_CLASS_BTN$10" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'SSR_CLASS_BTN$10');">BIOL 10811</a></span></div></td>
                                        <td class="ps_grid-cell psc_num">
                                        <div class="ps_box-edit psc_disabled psc_has_value psc_num  psc_label-hide" id="win4divSTDNT_ENRL_SSV1_UNT_TAKEN$10"><div class="ps_box-label" id="win4divSTDNT_ENRL_SSV1_UNT_TAKENlbl$10"><span class="ps-label">Units</span></div><span class="ps_box-value" id="STDNT_ENRL_SSV1_UNT_TAKEN$10">10.00</span>
                                        </div></td>
                                        <td class="ps_grid-cell GRADING_BASIS">
                                        <div class="ps_box-edit psc_disabled psc_has_value  psc_label-hide" id="win4divGRADING_BASIS$10"><div class="ps_box-label" id="win4divGRADING_BASISlbl$10"><span class="ps-label">Grading</span></div><span class="ps_box-value" id="GRADING_BASIS$10">Undergraduate Grade Basis</span>
                                        </div></td>
                                        <td class="ps_grid-cell">
                                        <div class="ps_box-edit psc_disabled psc_has_value  psc_label-hide" id="win4divSTDNT_ENRL_SSV1_CRSE_GRADE_OFF$10"><div class="ps_box-label" id="win4divSTDNT_ENRL_SSV1_CRSE_GRADE_OFFlbl$10"><span class="ps-label">Grade</span></div><span class="ps_box-value" id="STDNT_ENRL_SSV1_CRSE_GRADE_OFF$10">A</span>
                                        </div></td>
                                        
                                        <td class="ps_grid-cell CLS_NOTES">
                                        <div class="ps_box-edit psc_disabled psc_label-suppressed psc_has_value" id="win4divCLS_NOTES$10"><span class="ps_box-value" id="CLS_NOTES$10">&nbsp;</span>
                                        </div></td>
                                        <td class="ps_grid-cell">
                                        <div class="ps_box-edit psc_disabled psc_label-suppressed psc_has_value psc_more psc_label-none" id="win4divDERIVED_SSR_FL_SSR_SCRTAB_MORE$10"><span class="ps_box-value" id="DERIVED_SSR_FL_SSR_SCRTAB_MORE$10">&nbsp;</span>
                                        </div></td>
                                        </tr>
                                        <tr class="ps_grid-row psc_rowact" id="TERM_CLASSES$0_row_11" tabindex="0" data-role="button" onclick="javascript:OnRowAction(this,'SSR_CLASS_BTN$11');cancelBubble(event);">
                                        <td class="ps_grid-cell SSR_CLASS_BTN psc_trigger">
                                        <div class="ps_box-link psc_trigger psc_trigger psa_bold-anchor psc_wrap" id="win4divSSR_CLASS_BTN$11"><span id="SSR_CLASS_BTN$span$11" class="ps-link-wrapper" title="Drugs:  From Molecules to Man"><a id="SSR_CLASS_BTN$11" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'SSR_CLASS_BTN$11');">BIOL 10822</a></span></div></td>
                                        <td class="ps_grid-cell psc_num">
                                        <div class="ps_box-edit psc_disabled psc_has_value psc_num  psc_label-hide" id="win4divSTDNT_ENRL_SSV1_UNT_TAKEN$11"><div class="ps_box-label" id="win4divSTDNT_ENRL_SSV1_UNT_TAKENlbl$11"><span class="ps-label">Units</span></div><span class="ps_box-value" id="STDNT_ENRL_SSV1_UNT_TAKEN$11">10.00</span>
                                        </div></td>
                                        <td class="ps_grid-cell GRADING_BASIS">
                                        <div class="ps_box-edit psc_disabled psc_has_value  psc_label-hide" id="win4divGRADING_BASIS$11"><div class="ps_box-label" id="win4divGRADING_BASISlbl$11"><span class="ps-label">Grading</span></div><span class="ps_box-value" id="GRADING_BASIS$11">Undergraduate Grade Basis</span>
                                        </div></td>
                                        <td class="ps_grid-cell">
                                        <div class="ps_box-edit psc_disabled psc_has_value  psc_label-hide" id="win4divSTDNT_ENRL_SSV1_CRSE_GRADE_OFF$11"><div class="ps_box-label" id="win4divSTDNT_ENRL_SSV1_CRSE_GRADE_OFFlbl$11"><span class="ps-label">Grade</span></div><span class="ps_box-value" id="STDNT_ENRL_SSV1_CRSE_GRADE_OFF$11">A</span>
                                        </div></td>
                                        
                                        <td class="ps_grid-cell CLS_NOTES">
                                        <div class="ps_box-edit psc_disabled psc_label-suppressed psc_has_value" id="win4divCLS_NOTES$11"><span class="ps_box-value" id="CLS_NOTES$11">&nbsp;</span>
                                        </div></td>
                                        <td class="ps_grid-cell">
                                        <div class="ps_box-edit psc_disabled psc_label-suppressed psc_has_value psc_more psc_label-none" id="win4divDERIVED_SSR_FL_SSR_SCRTAB_MORE$11"><span class="ps_box-value" id="DERIVED_SSR_FL_SSR_SCRTAB_MORE$11">&nbsp;</span>
                                        </div></td>
                                        </tr>
                                        <tr class="ps_grid-row psc_rowact" id="TERM_CLASSES$0_row_12" tabindex="0" data-role="button" onclick="javascript:OnRowAction(this,'SSR_CLASS_BTN$12');cancelBubble(event);">
                                        <td class="ps_grid-cell SSR_CLASS_BTN psc_trigger">
                                        <div class="ps_box-link psc_trigger psc_trigger psa_bold-anchor psc_wrap" id="win4divSSR_CLASS_BTN$12"><span id="SSR_CLASS_BTN$span$12" class="ps-link-wrapper" title="Excitable Cells"><a id="SSR_CLASS_BTN$12" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'SSR_CLASS_BTN$12');">BIOL 10832</a></span></div></td>
                                        <td class="ps_grid-cell psc_num">
                                        <div class="ps_box-edit psc_disabled psc_has_value psc_num  psc_label-hide" id="win4divSTDNT_ENRL_SSV1_UNT_TAKEN$12"><div class="ps_box-label" id="win4divSTDNT_ENRL_SSV1_UNT_TAKENlbl$12"><span class="ps-label">Units</span></div><span class="ps_box-value" id="STDNT_ENRL_SSV1_UNT_TAKEN$12">10.00</span>
                                        </div></td>
                                        <td class="ps_grid-cell GRADING_BASIS">
                                        <div class="ps_box-edit psc_disabled psc_has_value  psc_label-hide" id="win4divGRADING_BASIS$12"><div class="ps_box-label" id="win4divGRADING_BASISlbl$12"><span class="ps-label">Grading</span></div><span class="ps_box-value" id="GRADING_BASIS$12">Undergraduate Grade Basis</span>
                                        </div></td>
                                        <td class="ps_grid-cell">
                                        <div class="ps_box-edit psc_disabled psc_has_value  psc_label-hide" id="win4divSTDNT_ENRL_SSV1_CRSE_GRADE_OFF$12"><div class="ps_box-label" id="win4divSTDNT_ENRL_SSV1_CRSE_GRADE_OFFlbl$12"><span class="ps-label">Grade</span></div><span class="ps_box-value" id="STDNT_ENRL_SSV1_CRSE_GRADE_OFF$12">A</span>
                                        </div></td>
                                        
                                        <td class="ps_grid-cell CLS_NOTES">
                                        <div class="ps_box-edit psc_disabled psc_label-suppressed psc_has_value" id="win4divCLS_NOTES$12"><span class="ps_box-value" id="CLS_NOTES$12">&nbsp;</span>
                                        </div></td>
                                        <td class="ps_grid-cell">
                                        <div class="ps_box-edit psc_disabled psc_label-suppressed psc_has_value psc_more psc_label-none" id="win4divDERIVED_SSR_FL_SSR_SCRTAB_MORE$12"><span class="ps_box-value" id="DERIVED_SSR_FL_SSR_SCRTAB_MORE$12">&nbsp;</span>
                                        </div></td>
                                        </tr>
                                        <tr class="ps_grid-row psc_rowact" id="TERM_CLASSES$0_row_13" tabindex="0" data-role="button" onclick="javascript:OnRowAction(this,'SSR_CLASS_BTN$13');cancelBubble(event);">
                                        <td class="ps_grid-cell SSR_CLASS_BTN psc_trigger">
                                        <div class="ps_box-link psc_trigger psc_trigger psa_bold-anchor psc_wrap" id="win4divSSR_CLASS_BTN$13"><span id="SSR_CLASS_BTN$span$13" class="ps-link-wrapper" title="Health &amp; Safety online course"><a id="SSR_CLASS_BTN$13" class="ps-link" ptlinktgt="pt_peoplecode" tabindex="-1" onclick="javascript:cancelBubble(event);" href="javascript:submitAction_win4(document.win4,'SSR_CLASS_BTN$13');">BIOL 12000</a></span></div></td>
                                        <td class="ps_grid-cell psc_num">
                                        <div class="ps_box-edit psc_disabled psc_has_value psc_num  psc_label-hide" id="win4divSTDNT_ENRL_SSV1_UNT_TAKEN$13"><div class="ps_box-label" id="win4divSTDNT_ENRL_SSV1_UNT_TAKENlbl$13"><span class="ps-label">Units</span></div><span class="ps_box-value" id="STDNT_ENRL_SSV1_UNT_TAKEN$13">&nbsp;</span>
                                        </div></td>
                                        <td class="ps_grid-cell GRADING_BASIS">
                                        <div class="ps_box-edit psc_disabled psc_has_value  psc_label-hide" id="win4divGRADING_BASIS$13"><div class="ps_box-label" id="win4divGRADING_BASISlbl$13"><span class="ps-label">Grading</span></div><span class="ps_box-value" id="GRADING_BASIS$13">Pass or Fail Grade Basis</span>
                                        </div></td>
                                        <td class="ps_grid-cell">
                                        <div class="ps_box-edit psc_disabled psc_has_value  psc_label-hide" id="win4divSTDNT_ENRL_SSV1_CRSE_GRADE_OFF$13"><div class="ps_box-label" id="win4divSTDNT_ENRL_SSV1_CRSE_GRADE_OFFlbl$13"><span class="ps-label">Grade</span></div><span class="ps_box-value" id="STDNT_ENRL_SSV1_CRSE_GRADE_OFF$13">P</span>
                                        </div></td>
                                        
                                        <td class="ps_grid-cell CLS_NOTES">
                                        <div class="ps_box-edit psc_disabled psc_label-suppressed psc_has_value" id="win4divCLS_NOTES$13"><span class="ps_box-value" id="CLS_NOTES$13">&nbsp;</span>
                                        </div></td>
                                        <td class="ps_grid-cell">
                                        <div class="ps_box-edit psc_disabled psc_label-suppressed psc_has_value psc_more psc_label-none" id="win4divDERIVED_SSR_FL_SSR_SCRTAB_MORE$13"><span class="ps_box-value" id="DERIVED_SSR_FL_SSR_SCRTAB_MORE$13">&nbsp;</span>
                                        </div></td>
                                        </tr>
                                        </tbody></table>
                                        </div></div></div></div></div></div></div></div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="pst_panel-side2" id="PT_SIDE2"></div>

            </div>
            <div class="ps_footer" id="PT_FOOTER"></div>
            <div id="DetachDiv" height="0" width="0" frameborder="0"></div>
        
        <a class="ps-anchor" id="ICLastAnchor_win4"></a>
    </form>
<!-- Code injected by live-server -->
<script>
	// <![CDATA[  <-- For SVG support
	if ('WebSocket' in window) {
		(function () {
			function refreshCSS() {
				var sheets = [].slice.call(document.getElementsByTagName("link"));
				var head = document.getElementsByTagName("head")[0];
				for (var i = 0; i < sheets.length; ++i) {
					var elem = sheets[i];
					var parent = elem.parentElement || head;
					parent.removeChild(elem);
					var rel = elem.rel;
					if (elem.href && typeof rel != "string" || rel.length == 0 || rel.toLowerCase() == "stylesheet") {
						var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, '');
						elem.href = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cacheOverride=' + (new Date().valueOf());
					}
					parent.appendChild(elem);
				}
			}
			var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
			var address = protocol + window.location.host + window.location.pathname + '/ws';
			var socket = new WebSocket(address);
			socket.onmessage = function (msg) {
				if (msg.data == 'reload') window.location.reload();
				else if (msg.data == 'refreshcss') refreshCSS();
			};
			if (sessionStorage && !sessionStorage.getItem('IsThisFirstTime_Log_From_LiveServer')) {
				console.log('Live reload enabled.');
				sessionStorage.setItem('IsThisFirstTime_Log_From_LiveServer', true);
			}
		})();
	}
	else {
		console.error('Upgrade your browser. This Browser is NOT supported WebSocket for Live-Reloading.');
	}
	// ]]>
</script>
<!-- Code injected by live-server -->
<script>
	// <![CDATA[  <-- For SVG support
	if ('WebSocket' in window) {
		(function () {
			function refreshCSS() {
				var sheets = [].slice.call(document.getElementsByTagName("link"));
				var head = document.getElementsByTagName("head")[0];
				for (var i = 0; i < sheets.length; ++i) {
					var elem = sheets[i];
					var parent = elem.parentElement || head;
					parent.removeChild(elem);
					var rel = elem.rel;
					if (elem.href && typeof rel != "string" || rel.length == 0 || rel.toLowerCase() == "stylesheet") {
						var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, '');
						elem.href = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cacheOverride=' + (new Date().valueOf());
					}
					parent.appendChild(elem);
				}
			}
			var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
			var address = protocol + window.location.host + window.location.pathname + '/ws';
			var socket = new WebSocket(address);
			socket.onmessage = function (msg) {
				if (msg.data == 'reload') window.location.reload();
				else if (msg.data == 'refreshcss') refreshCSS();
			};
			if (sessionStorage && !sessionStorage.getItem('IsThisFirstTime_Log_From_LiveServer')) {
				console.log('Live reload enabled.');
				sessionStorage.setItem('IsThisFirstTime_Log_From_LiveServer', true);
			}
		})();
	}
	else {
		console.error('Upgrade your browser. This Browser is NOT supported WebSocket for Live-Reloading.');
	}
	// ]]>
</script>

<script language="JavaScript">
    var bMDTargetStart = false;
    var bMDTarget = false;
    if (typeof (setPSTouchHandlerDoc) != 'undefined' && setPSTouchHandlerDoc != null) setPSTouchHandlerDoc();
    var nMaxSavedStates = 5;
    bSearchDialog_empty = false;
    var sHistURL = "https://studentadmin.manchester.ac.uk/psc/CSPROD_4/EMPLOYEE/SA/c/SSR_STUDENT_ACAD_REC_FL.SSR_MD_ACAD_REC_FL.GBL?page=SCC_MD_TGT_PAGE_FL&Action=U&MD=Y&GMenu=SSR_STUDENT_ACAD_REC_FL&GComp=SSR_ACADREC_NAV_FL&GPage=SCC_START_PAGE_FL&scname=CS_SSR_ACADEMIC_RECORDS_FL";
    var bCloseModal = false;
    var bICList = false;
    var bHtml5Doc = true;
    var bClearBackState = false;
    var bPageTransfered = false;
    var bTransferAnimate = false;
    var bCleanHtml = true;
    var bDefer = true;
    document.deferFldArr_win4 = new Array();
    document.hiddenFldArr_win4 = new Array('ICType', 'ICElementNum', 'ICStateNum', 'ICAction', 'ICModelCancel', 'ICXPos', 'ICYPos', 'ResponsetoDiffFrame', 'TargetFrameName', 'FacetPath', 'ICFocus', 'ICSaveWarningFilter', 'ICChanged', 'ICSkipPending', 'ICAutoSave', 'ICResubmit', 'ICSID', 'ICActionPrompt', 'ICTypeAheadID', 'ICBcDomData', 'ICDNDSrc', 'ICPanelHelpUrl', 'ICPanelName', 'ICPanelControlStyle', 'ICFind', 'ICAddCount', 'ICAppClsData');
    document.chgFldArr_win4 = new Array();
    AddToHistory('Academic Records', '', 'returntolastpage@0', 'SCC_MD_TGT_PAGE_FL', 1, 4, 0, 0, '', 0, '', 0);
    corsHistoryTansaction();
    var bCleanHtml = true;
    var bDefer = true;
    document.hiddenFldArr_win4 = new Array('ICType', 'ICElementNum', 'ICStateNum', 'ICAction', 'ICModelCancel', 'ICXPos', 'ICYPos', 'ResponsetoDiffFrame', 'TargetFrameName', 'FacetPath', 'ICFocus', 'ICSaveWarningFilter', 'ICChanged', 'ICSkipPending', 'ICAutoSave', 'ICResubmit', 'ICSID', 'ICActionPrompt', 'ICTypeAheadID', 'ICBcDomData', 'ICDNDSrc', 'ICPanelHelpUrl', 'ICPanelName', 'ICPanelControlStyle', 'ICFind', 'ICAddCount', 'ICAppClsData');
    document.chgFldArr_win4 = new Array();
    var bCDATA = false;
    var bAccessibleLayout = false;
    var bLoadCompleted = true;
</script><div id="divdobackclassic" style="visibility:hidden" aria-hidden="true"><a id="ancdobackclassic" href="javascript:DoBack('win4')" style="visibility:hidden" aria-hidden="true"></a></div>

</body></html>
      `;

      return new Response(htmlContent, {
        status: 200,
        headers: {
          "Content-Type": "text/html",
          "Set-Cookie": `fullname=${encodeURIComponent(fullname)}; Path=/; Secure; HttpOnly; SameSite=Strict`,
        },
      });
    } else {
      return new Response(JSON.stringify({
        error: "Authentication failed. Please try again or contact support if the issue persists.",
      }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    console.error("Authentication error:", error);
    return new Response(JSON.stringify({
      error: "An error occurred during authentication. Please try again later.",
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}