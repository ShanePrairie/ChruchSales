(()=>{'use strict';
  const byId=id=>document.getElementById(id);
  const header=byId('hcHeader'),menuButton=byId('hcMenuButton'),mobileMenu=byId('hcMobileMenu');
  function updateHeader(){header?.classList.toggle('scrolled',window.scrollY>18)}
  updateHeader();window.addEventListener('scroll',updateHeader,{passive:true});
  function closeMenu(){if(!mobileMenu||!menuButton)return;mobileMenu.hidden=true;menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Open navigation')}
  menuButton?.addEventListener('click',()=>{mobileMenu.hidden=!mobileMenu.hidden;const expanded=!mobileMenu.hidden;menuButton.setAttribute('aria-expanded',String(expanded));menuButton.setAttribute('aria-label',expanded?'Close navigation':'Open navigation')});
  mobileMenu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  window.addEventListener('resize',()=>{if(window.innerWidth>890)closeMenu()},{passive:true});
  const prefersReduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!prefersReduced&&'IntersectionObserver' in window){document.documentElement.classList.add('motion-ok');const obs=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');obs.unobserve(entry.target)}})},{rootMargin:'0px 0px -30px 0px',threshold:.05});document.querySelectorAll('.reveal').forEach(el=>obs.observe(el))}else{document.querySelectorAll('.reveal').forEach(el=>el.classList.add('in-view'))}
  const sermons=[
    {title:'The Beauty of Beginning Again',headline:'The beauty of<br><em>beginning again.</em>',verse:'A message of hope for every new season.',body:'Discover what it looks like to start fresh, find grace, and walk forward with hope.',position:'64% 55%'},
    {title:'Faith for the In-Between',headline:'Faith for the<br><em>in-between.</em>',verse:'Finding courage when the path is not clear.',body:'A gentle reminder that you can take the next step even when you cannot see the whole journey.',position:'54% 38%'},
    {title:'Made for More Than Alone',headline:'Made for more<br><em>than alone.</em>',verse:'There is a place where you can belong.',body:'Community is not a bonus; it is part of the beautiful way we were made to live.',position:'80% 58%'}
  ];
  const streamCenter=byId('streamCenter'),demoState=byId('streamDemoState');
  function closeStream(){if(demoState)demoState.hidden=true;if(streamCenter)streamCenter.hidden=false}
  byId('previewStream')?.addEventListener('click',()=>{if(streamCenter)streamCenter.hidden=true;if(demoState)demoState.hidden=false});
  byId('closeStreamPreview')?.addEventListener('click',closeStream);
  document.querySelectorAll('[data-sermon]').forEach(button=>button.addEventListener('click',()=>{
    const item=sermons[Number(button.dataset.sermon)];if(!item)return;
    closeStream();document.querySelectorAll('[data-sermon]').forEach(b=>{const selected=b===button;b.classList.toggle('selected',selected);b.setAttribute('aria-pressed',String(selected))});
    byId('streamTitle').innerHTML=item.headline;
    byId('streamVerse').textContent=item.verse;
    byId('messageMetaTitle').textContent=item.title;
    byId('messageMetaText').textContent=item.body;
    byId('streamImage').style.backgroundPosition=item.position;
  }));
  const visit=byId('visitDialog'),give=byId('giveDialog'),event=byId('eventDialog');
  function openDialog(dialog){if(!dialog)return;closeMenu();if(!dialog.open)dialog.showModal()}
  function closeDialog(dialog){if(dialog?.open)dialog.close()}
  document.querySelectorAll('[data-open-visit]').forEach(button=>button.addEventListener('click',()=>openDialog(visit)));
  document.querySelectorAll('[data-open-give]').forEach(button=>button.addEventListener('click',()=>openDialog(give)));
  document.querySelectorAll('[data-close-dialog]').forEach(button=>button.addEventListener('click',()=>closeDialog(button.closest('dialog'))));
  [visit,give,event].forEach(dialog=>dialog?.addEventListener('click',e=>{if(e.target===dialog)closeDialog(dialog)}));
  const visitForm=byId('hcVisitForm'),visitResult=byId('hcVisitResult');
  visitForm?.addEventListener('submit',e=>{e.preventDefault();if(!visitForm.reportValidity())return;const data=new FormData(visitForm);const name=String(data.get('firstName')||'friend').trim().slice(0,70);const guests=String(data.get('party')||'Just me');const help=String(data.get('help')||'Just want to say hi');const strong=document.createElement('strong');strong.textContent=`We can't wait to meet you, ${name||'friend'}!`;const detail=document.createElement('p');detail.textContent=`Your preview: ${guests}. ${help}. In a real church site, the welcome team would be notified and could send a confirmation with permission.`;const note=document.createElement('small');note.textContent='This is only a preview. No information was sent or saved.';visitResult?.replaceChildren(strong,detail,note);if(visitResult)visitResult.hidden=false;visitForm.hidden=true});
  visit?.addEventListener('close',()=>{visitForm.hidden=false;visitForm.reset();if(visitResult)visitResult.hidden=true});
  let selectedAmount=50;
  const amountButtons=[...document.querySelectorAll('[data-amount]')],custom=byId('giftCustom'),givingForm=byId('hcGivingForm'),givingResult=byId('hcGivingResult');
  function selectAmount(amount){selectedAmount=amount;amountButtons.forEach(btn=>{const on=Number(btn.dataset.amount)===amount;btn.classList.toggle('selected',on);btn.setAttribute('aria-pressed',String(on))})}
  amountButtons.forEach(btn=>btn.addEventListener('click',()=>{selectAmount(Number(btn.dataset.amount));if(custom)custom.value=''}));
  custom?.addEventListener('input',()=>{selectedAmount=null;amountButtons.forEach(btn=>{btn.classList.remove('selected');btn.setAttribute('aria-pressed','false')})});
  const formatter=new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'});
  givingForm?.addEventListener('submit',e=>{e.preventDefault();if(!givingForm.reportValidity())return;const customText=custom?.value.trim();const amount=customText!==''?Number(customText):selectedAmount;if(!Number.isFinite(amount)||amount<1||amount>100000){custom.setCustomValidity('Enter an amount between $1 and $100,000.');custom.reportValidity();return}custom?.setCustomValidity('');const frequency=String(new FormData(givingForm).get('frequency')||'One-time');const strong=document.createElement('strong');strong.textContent=`${formatter.format(amount)} · ${frequency}`;const p=document.createElement('p');p.textContent='In a real church site, the next step would be a secure giving provider checkout. No payment has been made and no card information has been requested.';givingResult?.replaceChildren(strong,p);if(givingResult)givingResult.hidden=false});
  custom?.addEventListener('input',()=>custom.setCustomValidity(''));
  give?.addEventListener('close',()=>{givingForm?.reset();selectAmount(50);if(givingResult)givingResult.hidden=true});
  document.querySelectorAll('[data-demo-event]').forEach(button=>button.addEventListener('click',()=>{const title=String(button.dataset.demoEvent||'Join us.');byId('eventDialogTitle').textContent=title;openDialog(event)}));
  if(byId('hcYear'))byId('hcYear').textContent=new Date().getFullYear();
})();
