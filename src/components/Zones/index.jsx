import { useState, useEffect } from "react";
import { ZONES } from "../../data/gameData";
import { SKILLS_DATA, EXPERIENCE_DATA, PROJECTS_DATA, CERTS_DATA } from "../../data/portfolioData";
import { ZoneBG, RadarChart, SkillTooltip } from "../shared";
import botImg from "../../bot.jpg";

export function ZoneInterior({ zoneId, onBack, onXp, onAchieve, playSound }) {
  const zone = ZONES.find(z => z.id === zoneId);
  const [activeSkillCat, setActiveSkillCat] = useState('backend');
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [flippedQuest, setFlippedQuest] = useState(null);
  const [chestOpen, setChestOpen] = useState({});
  const [formSent, setFormSent] = useState(false);
  const [expandedExp, setExpandedExp] = useState(0);
  const [visitedCats, setVisitedCats] = useState(new Set(['backend']));
  const [flippedQuests, setFlippedQuests] = useState(new Set());
  const [typewriterIdx, setTypewriterIdx] = useState(0);

  const sec = { minHeight:'100vh',padding:'70px 16px max(100px, calc(80px + env(safe-area-inset-bottom, 0px)))',fontFamily:"'Nunito',sans-serif",background:'#FFFCF5',position:'fixed',inset:0,overflowY:'auto',overflowX:'hidden',WebkitOverflowScrolling:'touch',overscrollBehavior:'contain' };
  const h1s = { fontFamily:"'Silkscreen',cursive",fontSize:24,color:'#3a3a5c',textAlign:'center',marginBottom:4 };
  const subs = { fontSize:13,color:'#888',textAlign:'center',marginBottom:28 };
  const back = <button onClick={onBack} aria-label="Return to world map" style={{position:'fixed',bottom:'max(20px, env(safe-area-inset-bottom, 20px))',left:'50%',transform:'translateX(-50%)',zIndex:100,background:'linear-gradient(135deg,#6C63FF,#9B8FFF)',color:'#fff',border:'none',borderRadius:24,padding:'12px 32px',fontFamily:"'Silkscreen',cursive",fontSize:12,cursor:'pointer',boxShadow:'0 4px 16px rgba(108,99,255,0.3)',transition:'transform 0.2s',WebkitTapHighlightColor:'transparent',minHeight:44}} onMouseEnter={e=>e.target.style.transform='translateX(-50%) scale(1.05)'} onMouseLeave={e=>e.target.style.transform='translateX(-50%) scale(1)'}>← Return to World Map</button>;

  // ═══ CHARACTER PROFILE ═══
  if (zoneId === 'profile') {
    const stats = [{label:"Backend",value:92},{label:"Frontend",value:78},{label:"Database",value:88},{label:"DevOps",value:70},{label:"Problem\nSolving",value:90},{label:"AI",value:65}];
    const bio = "A seasoned adventurer with ~4 years of questing across the lands of enterprise software. Wields C#, .NET, React, and SQL with precision. Known for clean code, owning features end-to-end, and collaborating across guilds.";
    // eslint-disable-next-line
    useEffect(() => { if (typewriterIdx < bio.length) { const t = setTimeout(() => setTypewriterIdx(p => p + 1), 18); return () => clearTimeout(t); } }, [typewriterIdx]);
    return (<div style={{...sec,animation:'zoneEnter 0.6s ease'}}><ZoneBG type="village"/>
      <div style={{position:'relative',zIndex:1}}><div style={h1s}>🏠 {zone.name}</div><div style={subs}>{zone.description}</div>
      <div style={{maxWidth:620,margin:'0 auto'}}>
        <div style={{background:'linear-gradient(135deg,#f0eeff,#fff5e6)',borderRadius:24,padding:32,textAlign:'center',border:'2px solid rgba(108,99,255,0.12)',boxShadow:'0 12px 40px rgba(108,99,255,0.06)',marginBottom:28,position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',top:12,right:16,fontFamily:"'Silkscreen',cursive",fontSize:9,color:'#6C63FF',opacity:0.5}}>Character Sheet</div>
          <div style={{fontSize:64,marginBottom:10,animation:'bob 2.5s ease-in-out infinite'}}>🧙‍♀️</div>
          <div style={{fontFamily:"'Silkscreen',cursive",fontSize:20,color:'#3a3a5c'}}>Nidhi Agarwal</div>
          <div style={{fontSize:13,color:'#6C63FF',fontWeight:700,marginTop:6}}>Full Stack Software Engineer</div>
          <div style={{display:'flex',justifyContent:'center',gap:16,marginTop:8,fontSize:11,color:'#888'}}>
            <span>🎭 Class: <b style={{color:'#3a3a5c'}}>Code Mage</b></span>
            <span>⚔️ Rank: <b style={{color:'#3a3a5c'}}>Senior Knight</b></span>
          </div>
          <div style={{fontSize:12,color:'#555',marginTop:18,lineHeight:1.8,textAlign:'left',maxWidth:500,margin:'18px auto 0',minHeight:60}}>
            {bio.slice(0, typewriterIdx)}<span style={{opacity:typewriterIdx<bio.length?1:0,animation:'blink 0.8s step-end infinite'}}>|</span>
          </div>
        </div>
        <div style={{fontFamily:"'Silkscreen',cursive",fontSize:14,color:'#3a3a5c',marginBottom:16,textAlign:'center'}}>⚡ Power Stats</div>
        <div style={{background:'#fff',borderRadius:20,padding:'24px 16px',border:'1px solid rgba(108,99,255,0.08)',boxShadow:'0 4px 16px rgba(0,0,0,0.03)',marginBottom:24}}>
          <RadarChart stats={stats} size={240}/>
        </div>
        <div style={{display:'grid',gap:8,marginBottom:24}}>
          {stats.map((s,i)=>(<div key={s.label} style={{display:'flex',alignItems:'center',gap:12,animation:`fadeInQuick 0.5s ease ${i*0.08}s both`}}>
            <div style={{width:80,fontSize:11,fontWeight:700,color:'#555',textAlign:'right'}}>{s.label.replace('\n',' ')}</div>
            <div style={{flex:1,height:22,borderRadius:11,background:'rgba(108,99,255,0.06)',border:'1px solid rgba(108,99,255,0.08)',overflow:'hidden',position:'relative'}}>
              <div style={{height:'100%',borderRadius:11,background:`linear-gradient(90deg,${zone.color},${zone.color}88)`,width:`${s.value}%`,animation:`barGrow 1.2s cubic-bezier(0.34,1.56,0.64,1) ${i*0.12}s both`}}/>
              <div style={{position:'absolute',right:10,top:'50%',transform:'translateY(-50%)',fontSize:9,fontWeight:800,color:'#3a3a5c',fontFamily:"'Silkscreen',cursive"}}>{s.value}</div>
            </div>
          </div>))}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(130px,1fr))',gap:10}}>
          {[{label:"Education",value:"BCA – 9.11",icon:"🎓"},{label:"Experience",value:"~4 Years",icon:"⏱️"},{label:"Location",value:"India",icon:"📍"},{label:"Specialty",value:".NET + React",icon:"💎"}].map((info,i)=>(
            <div key={info.label} style={{background:'#fff',borderRadius:14,padding:'14px 12px',textAlign:'center',border:'1px solid rgba(0,0,0,0.05)',boxShadow:'0 2px 8px rgba(0,0,0,0.03)',animation:`fadeInQuick 0.4s ease ${0.6+i*0.08}s both`,transition:'transform 0.2s,box-shadow 0.2s',cursor:'default'}} onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.boxShadow='0 8px 24px rgba(0,0,0,0.06)';}} onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='0 2px 8px rgba(0,0,0,0.03)';}}>
              <div style={{fontSize:24}}>{info.icon}</div>
              <div style={{fontSize:9,color:'#999',marginTop:4,fontWeight:600,textTransform:'uppercase',letterSpacing:0.5}}>{info.label}</div>
              <div style={{fontSize:12,fontWeight:700,color:'#3a3a5c',marginTop:3}}>{info.value}</div>
            </div>))}
        </div>
      </div></div>{back}</div>);
  }

  // ═══ SKILLS FOREST ═══
  if (zoneId === 'skills') {
    const cat = SKILLS_DATA[activeSkillCat];
    const totalPts = cat.skills.reduce((a, s) => a + s.level, 0);
    const maxPts = cat.skills.length * 5;
    return (<div style={{...sec,animation:'zoneEnter 0.6s ease'}}><ZoneBG type="forest"/>
      <div style={{position:'relative',zIndex:1}}><div style={h1s}>🌳 {zone.name}</div><div style={subs}>{zone.description}</div>
      <div style={{maxWidth:620,margin:'0 auto'}}>
        <div style={{display:'flex',flexWrap:'wrap',gap:8,justifyContent:'center',marginBottom:20}}>
          {Object.entries(SKILLS_DATA).map(([key,val])=>(<button key={key} onClick={()=>{setActiveSkillCat(key);setHoveredSkill(null);const nc=new Set([...visitedCats,key]);setVisitedCats(nc);if(nc.size>=5&&onAchieve)onAchieve('skill_seeker');if(playSound)playSound('click');}} style={{background:activeSkillCat===key?`linear-gradient(135deg,${val.color},${val.color}cc)`:'#fff',color:activeSkillCat===key?'#fff':'#555',border:activeSkillCat===key?'none':'1px solid #e0e0e0',borderRadius:20,padding:'7px 18px',fontFamily:"'Silkscreen',cursive",fontSize:10,cursor:'pointer',transition:'all 0.3s',boxShadow:activeSkillCat===key?`0 4px 14px ${val.color}44`:'none'}}>{val.icon} {val.name}</button>))}
        </div>
        <div style={{background:`linear-gradient(135deg,${cat.color}08,${cat.color}04)`,borderRadius:16,padding:'14px 20px',marginBottom:16,display:'flex',alignItems:'center',justifyContent:'space-between',border:`1px solid ${cat.color}15`}}>
          <div><span style={{fontFamily:"'Silkscreen',cursive",fontSize:12,color:'#3a3a5c'}}>{cat.icon} {cat.name}</span><span style={{fontSize:11,color:'#888',marginLeft:8}}>{cat.skills.length} skills</span></div>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <div style={{width:80,height:8,borderRadius:4,background:'rgba(0,0,0,0.06)',overflow:'hidden'}}>
              <div style={{height:'100%',borderRadius:4,background:cat.color,width:`${(totalPts/maxPts)*100}%`,transition:'width 0.5s ease'}}/>
            </div>
            <span style={{fontFamily:"'Silkscreen',cursive",fontSize:10,color:cat.color}}>{totalPts}/{maxPts}</span>
          </div>
        </div>
        <div style={{display:'grid',gap:8}}>
          {cat.skills.map((skill,i)=>(
            <div key={skill.name} style={{background:'#fff',borderRadius:14,padding:'14px 18px',display:'flex',alignItems:'center',justifyContent:'space-between',border:`1px solid ${hoveredSkill===i?cat.color+'33':'rgba(0,0,0,0.04)'}`,boxShadow:hoveredSkill===i?`0 6px 24px ${cat.color}15`:'0 2px 8px rgba(0,0,0,0.03)',animation:`fadeInQuick 0.3s ease ${i*0.06}s both`,transition:'all 0.25s ease',cursor:'pointer',position:'relative'}}
              onMouseEnter={()=>setHoveredSkill(i)} onMouseLeave={()=>setHoveredSkill(null)}>
              {hoveredSkill===i && <SkillTooltip skill={skill} catColor={cat.color}/>}
              <div style={{display:'flex',alignItems:'center',gap:12}}>
                <div style={{width:34,height:34,borderRadius:10,background:`linear-gradient(135deg,${cat.color}18,${cat.color}08)`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:15,transition:'transform 0.2s',transform:hoveredSkill===i?'scale(1.1) rotate(-5deg)':'scale(1)'}}>{cat.icon}</div>
                <div><span style={{fontWeight:700,fontSize:13,color:'#3a3a5c',display:'block'}}>{skill.name}</span>
                  <span style={{fontSize:10,color:'#aaa'}}>{['Novice','Basic','Skilled','Expert','Master'][skill.level-1]}</span></div>
              </div>
              <div style={{display:'flex',gap:3,alignItems:'center'}}>
                {Array.from({length:5},(_,j)=><div key={j} style={{width:16,height:16,borderRadius:4,background:j<skill.level?`linear-gradient(135deg,${cat.color},${cat.color}bb)`:'rgba(0,0,0,0.05)',boxShadow:j<skill.level?`0 2px 6px ${cat.color}33`:'none',transition:`all 0.3s ease ${j*0.05}s`,transform:hoveredSkill===i&&j<skill.level?'scale(1.15)':'scale(1)'}}/>)}
              </div>
            </div>))}
        </div>
      </div></div>{back}</div>);
  }

  // ═══ GUILD HALL ═══
  if (zoneId === 'guild') {
    return (<div style={{...sec,animation:'zoneEnter 0.6s ease'}}><ZoneBG type="castle"/>
      <div style={{position:'relative',zIndex:1}}><div style={h1s}>🏰 {zone.name}</div><div style={subs}>{zone.description}</div>
      <div style={{maxWidth:640,margin:'0 auto',position:'relative'}}>
        <div style={{background:'linear-gradient(135deg,#E8EAF6,#fff)',borderRadius:18,padding:'16px 20px',marginBottom:24,display:'flex',alignItems:'center',justifyContent:'space-between',border:'1px solid rgba(123,142,194,0.12)',flexWrap:'wrap',gap:12}}>
          <div style={{fontFamily:"'Silkscreen',cursive",fontSize:12,color:'#3a3a5c'}}>⚔️ Adventure Timeline</div>
          <div style={{display:'flex',gap:4,alignItems:'center'}}>
            {EXPERIENCE_DATA.map((_,i)=><div key={i} style={{width:24,height:6,borderRadius:3,background:i<=expandedExp?'linear-gradient(90deg,#7B8EC2,#9BAAD4)':'rgba(123,142,194,0.15)',transition:'background 0.3s'}}/>)}
            <span style={{fontFamily:"'Silkscreen',cursive",fontSize:9,color:'#7B8EC2',marginLeft:6}}>{EXPERIENCE_DATA.length} Roles</span>
          </div>
        </div>
        <div style={{position:'absolute',left:24,top:130,bottom:100,width:3,background:'linear-gradient(180deg,#7B8EC2,#7B8EC222)',borderRadius:2}}/>
        <div style={{display:'grid',gap:16,paddingLeft:52}}>
          {EXPERIENCE_DATA.map((exp,i)=>{
            const isExp = expandedExp === i;
            return <div key={i} onClick={()=>setExpandedExp(i)} style={{background:isExp?'linear-gradient(135deg,#f8f7ff,#fff)':'#fff',borderRadius:18,padding:isExp?'22px':'18px',border:`2px solid ${isExp?'#7B8EC2':'rgba(123,142,194,0.1)'}`,boxShadow:isExp?'0 8px 32px rgba(123,142,194,0.1)':'0 2px 8px rgba(0,0,0,0.03)',position:'relative',animation:`fadeInQuick 0.4s ease ${i*0.12}s both`,transition:'all 0.3s ease',cursor:'pointer'}}>
              <div style={{position:'absolute',left:-42,top:22,width:20,height:20,borderRadius:'50%',background:isExp?'linear-gradient(135deg,#6C63FF,#9B8FFF)':'linear-gradient(135deg,#7B8EC2,#9BAAD4)',border:'3px solid #FFFCF5',boxShadow:isExp?'0 0 12px rgba(108,99,255,0.3)':'0 2px 8px rgba(123,142,194,0.2)',transition:'all 0.3s'}}>
                <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:8,color:'#fff',fontWeight:800}}>{exp.rank}</div>
              </div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:8}}>
                <div><div style={{fontFamily:"'Silkscreen',cursive",fontSize:isExp?13:12,color:'#3a3a5c',transition:'font-size 0.3s'}}>{exp.role}</div><div style={{fontSize:12,color:'#7B8EC2',fontWeight:600,marginTop:2}}>{exp.company}</div></div>
                <div style={{background:'linear-gradient(135deg,#f0eeff,#fff5e6)',borderRadius:10,padding:'4px 12px',fontSize:10,fontWeight:700,color:'#6C63FF',whiteSpace:'nowrap'}}>{exp.badge}</div>
              </div>
              <div style={{fontSize:10,color:'#999',marginTop:4,display:'flex',gap:12,flexWrap:'wrap'}}><span>📅 {exp.period}</span><span>📍 {exp.type}</span></div>
              {isExp && <div style={{animation:'fadeInQuick 0.3s ease'}}>
                <div style={{marginTop:14,display:'grid',gap:5}}>
                  {exp.highlights.map((hl,j)=><div key={j} style={{fontSize:12,color:'#555',lineHeight:1.6,padding:'5px 10px',background:'rgba(123,142,194,0.04)',borderRadius:8,borderLeft:'3px solid #7B8EC2',animation:`fadeInQuick 0.3s ease ${j*0.08}s both`}}>• {hl}</div>)}
                </div>
                <div style={{display:'flex',flexWrap:'wrap',gap:5,marginTop:12}}>
                  {exp.tech.map(t=><span key={t} style={{background:'linear-gradient(135deg,#7B8EC222,#7B8EC211)',borderRadius:8,padding:'3px 10px',fontSize:10,color:'#5A6B99',fontWeight:600}}>{t}</span>)}
                </div>
              </div>}
              {!isExp && <div style={{marginTop:8,fontSize:11,color:'#aaa',fontStyle:'italic'}}>Click to expand details →</div>}
            </div>;})}
        </div>
      </div></div>{back}</div>);
  }

  // ═══ QUEST BOARD ═══
  if (zoneId === 'quests') {
    return (<div style={{...sec,animation:'zoneEnter 0.6s ease'}}><ZoneBG type="town"/>
      <div style={{position:'relative',zIndex:1}}><div style={h1s}>📜 {zone.name}</div><div style={subs}>{zone.description}</div>
      <div style={{maxWidth:660,margin:'0 auto'}}>
        <div style={{background:'linear-gradient(135deg,#FFF8E1,#fff)',borderRadius:18,padding:'14px 20px',marginBottom:20,display:'flex',alignItems:'center',justifyContent:'space-between',border:'1px solid rgba(212,168,83,0.12)',flexWrap:'wrap',gap:8}}>
          <span style={{fontFamily:"'Silkscreen',cursive",fontSize:12,color:'#3a3a5c'}}>📋 Quest Log</span>
          <div style={{display:'flex',gap:12,fontSize:11,color:'#888'}}>
            <span>✓ {PROJECTS_DATA.length} Completed</span>
            <span>⭐ {PROJECTS_DATA.reduce((a,q)=>a+q.difficulty,0)} Total Stars</span>
          </div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:16}}>
          {PROJECTS_DATA.map((q,i)=>{
            const isFlipped = flippedQuest === i;
            return <div key={i} onClick={()=>{const nf=isFlipped?null:i;setFlippedQuest(nf);if(!isFlipped){const nq=new Set([...flippedQuests,i]);setFlippedQuests(nq);onXp(5);if(playSound)playSound('click');if(nq.size>=PROJECTS_DATA.length&&onAchieve)onAchieve('quest_reader');}}} style={{background:isFlipped?'linear-gradient(135deg,#FFF5E6,#FFF0D4)':'#fff',borderRadius:20,padding:22,border:`2px solid ${isFlipped?'#D4A853':'rgba(212,168,83,0.1)'}`,boxShadow:isFlipped?'0 12px 40px rgba(212,168,83,0.12)':'0 2px 12px rgba(0,0,0,0.03)',cursor:'pointer',animation:`fadeInQuick 0.4s ease ${i*0.1}s both`,transition:'all 0.3s ease',position:'relative',overflow:'hidden'}}>
              <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:10}}>
                <div style={{width:42,height:42,borderRadius:12,background:'linear-gradient(135deg,#FFF5E6,#FFE8CC)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,border:'1px solid rgba(212,168,83,0.15)'}}>{q.icon}</div>
                <div style={{flex:1}}>
                  <div style={{fontFamily:"'Silkscreen',cursive",fontSize:12,color:'#3a3a5c'}}>{q.name}</div>
                  <div style={{fontSize:10,color:'#D4A853',fontWeight:600}}>{q.org} · {q.year}</div>
                </div>
              </div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
                <div style={{display:'flex',gap:2}}>{Array.from({length:5},(_,j)=><div key={j} style={{width:14,height:14,borderRadius:3,background:j<q.difficulty?'linear-gradient(135deg,#FFD700,#FFA500)':'rgba(0,0,0,0.06)',fontSize:8,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff'}}>{j<q.difficulty?'⭐':''}</div>)}</div>
                <div style={{background:'#5BAE6E',color:'#fff',borderRadius:8,padding:'3px 10px',fontSize:9,fontWeight:700,fontFamily:"'Silkscreen',cursive"}}>✓ {q.status}</div>
              </div>
              {isFlipped ? (
                <div style={{animation:'fadeInQuick 0.25s ease'}}>
                  {q.imageId === 'bot' && <img src={botImg} alt={q.name} style={{width:'100%',borderRadius:10,marginBottom:10,maxHeight:150,marginTop:6,objectFit:'contain'}} />}
                  <div style={{fontSize:12,color:'#555',lineHeight:1.7,marginBottom:12,padding:'8px 12px',background:'rgba(212,168,83,0.06)',borderRadius:10}}>{q.desc}</div>
                  <div style={{display:'flex',flexWrap:'wrap',gap:5}}>
                    {q.tech.map(t=><span key={t} style={{background:'linear-gradient(135deg,#D4A85322,#D4A85311)',borderRadius:8,padding:'4px 10px',fontSize:10,color:'#8B6914',fontWeight:600,border:'1px solid rgba(212,168,83,0.1)'}}>{t}</span>)}
                  </div>
                  {q.link && <a href={q.link} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()} style={{display:'block',marginTop:10,fontSize:10,color:'#D4A853',fontWeight:600,textDecoration:'none'}}>📂 View on GitHub →</a>}
                </div>
              ) : (
                <div style={{fontSize:11,color:'#bbb',marginTop:4,display:'flex',alignItems:'center',gap:4}}>
                  <span style={{animation:'pulseGlow 2s ease-in-out infinite',display:'inline-block'}}>🔍</span> Tap to reveal quest details
                </div>
              )}
            </div>;})}
        </div>
      </div></div>{back}</div>);
  }

  // ═══ TREASURE CAVE ═══
  if (zoneId === 'treasure') {
    return (<div style={{...sec,animation:'zoneEnter 0.6s ease'}}><ZoneBG type="cave"/>
      <div style={{position:'relative',zIndex:1}}><div style={h1s}>💎 {zone.name}</div><div style={subs}>{zone.description}</div>
      <div style={{maxWidth:520,margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:24,fontFamily:"'Silkscreen',cursive",fontSize:11,color:'#C47ED0'}}>
          ✨ {Object.keys(chestOpen).filter(k=>chestOpen[k]).length}/{CERTS_DATA.length} Chests Opened
        </div>
        <div style={{display:'grid',gap:18}}>
          {CERTS_DATA.map((c,i)=>{
            const isOpen = chestOpen[i];
            return <div key={i} onClick={()=>{if(!chestOpen[i]){const nc={...chestOpen,[i]:true};setChestOpen(nc);onXp(20);if(playSound)playSound('xp');if(Object.keys(nc).filter(k=>nc[k]).length>=CERTS_DATA.length&&onAchieve)onAchieve('treasure_hunter');}}} style={{background:isOpen?`linear-gradient(135deg,${c.color}08,${c.color}04)`:'#fff',borderRadius:20,padding:24,border:`2px solid ${isOpen?c.color+'33':'rgba(196,126,208,0.1)'}`,boxShadow:isOpen?`0 8px 32px ${c.color}11`:'0 2px 12px rgba(0,0,0,0.03)',cursor:isOpen?'default':'pointer',animation:`fadeInQuick 0.5s ease ${i*0.15}s both`,transition:'all 0.5s ease',textAlign:'center',position:'relative',overflow:'hidden'}}>
              {isOpen && <>{[...Array(6)].map((_,j)=><div key={j} style={{position:'absolute',left:`${20+j*12}%`,top:`${10+j*8}%`,fontSize:10,opacity:0,animation:`sparkle 1s ease ${j*0.15}s forwards`,pointerEvents:'none'}}>✨</div>)}</>}
              <div style={{fontSize:isOpen?48:40,marginBottom:10,transition:'font-size 0.4s',animation:isOpen?'bounceMarker 0.5s ease':'none'}}>
                {isOpen ? c.icon : '📦'}
              </div>
              {isOpen ? (
                <div style={{animation:'fadeInQuick 0.4s ease'}}>
                  <div style={{fontFamily:"'Silkscreen',cursive",fontSize:14,color:'#3a3a5c'}}>{c.name}</div>
                  <div style={{fontSize:12,color:c.color,fontWeight:700,marginTop:6}}>{c.org}</div>
                  <div style={{fontSize:12,color:'#666',marginTop:10,lineHeight:1.6,padding:'10px 16px',background:'rgba(255,255,255,0.6)',borderRadius:12}}>{c.desc}</div>
                  <div style={{marginTop:10,fontSize:10,color:'#aaa'}}>+20 XP earned!</div>
                </div>
              ) : (
                <div><div style={{fontSize:13,color:'#999',fontFamily:"'Silkscreen',cursive"}}>Locked Chest</div>
                  <div style={{fontSize:11,color:'#ccc',marginTop:4}}>Click to unlock...</div></div>
              )}
            </div>;})}
        </div>
      </div></div>{back}</div>);
  }

  // ═══ TAVERN ═══
  if (zoneId === 'tavern') {
    const [dialogStep, setDialogStep] = useState(0);
    const [formName, setFormName] = useState('');
    const [formEmail, setFormEmail] = useState('');
    const [formMsg, setFormMsg] = useState('');
    const dialogues = [
      "Ah, a fellow Explorer! Welcome to The Tavern! 🍺",
      "Looking to equip a skilled code mage? You've come to the right place!",
      "Whispers tell of Nidhi, a versatile full-stack engineer, crafting robust and scalable systems with precision.",
      "Send a raven below and she shall answer your call! 🕊️"
    ];

    return (<div style={{...sec,animation:'zoneEnter 0.6s ease'}}><ZoneBG type="tavern"/>
      <div style={{position:'relative',zIndex:1}}><div style={h1s}>🍺 {zone.name}</div><div style={subs}>{zone.description}</div>
      <div style={{maxWidth:520,margin:'0 auto'}}>
        <div style={{background:'linear-gradient(135deg,#FFF5E6,#FFE8D6)',borderRadius:24,padding:28,textAlign:'center',border:'2px solid rgba(224,123,90,0.15)',marginBottom:28,position:'relative'}}>
          <div style={{fontSize:52,animation:'bob 3s ease-in-out infinite'}}>🧙</div>
          <div style={{fontFamily:"'Silkscreen',cursive",fontSize:10,color:'#E07B5A',marginBottom:8}}>Raven Keeper</div>
          <div style={{background:'#fff',borderRadius:16,padding:'14px 22px',fontSize:13,color:'#555',lineHeight:1.7,position:'relative',display:'inline-block',border:'1px solid rgba(0,0,0,0.05)',minHeight:44,maxWidth:380}}>
            <div onClick={()=>setDialogStep(p=>(p+1)%dialogues.length)} style={{background:'#fff',borderRadius:16,padding:'14px 22px',fontSize:13,color:'#555',lineHeight:1.7,position:'relative',display:'inline-block',border:'1px solid rgba(0,0,0,0.05)',minHeight:44,maxWidth:380,cursor:'pointer'}}>
              <div style={{position:'absolute',bottom:'100%',left:'50%',transform:'translateX(-50%)',width:0,height:0,borderLeft:'8px solid transparent',borderRight:'8px solid transparent',borderBottom:'8px solid #fff'}}/>
              <div key={dialogStep} style={{animation:'fadeInQuick 0.4s ease'}}>{dialogues[dialogStep]}</div>
            </div>
          </div>
          <div style={{display:'flex',justifyContent:'center',gap:4,marginTop:10}}>
            {dialogues.map((_,i)=><div key={i} style={{width:6,height:6,borderRadius:'50%',background:i<=dialogStep?'#E07B5A':'rgba(224,123,90,0.2)',transition:'background 0.3s'}}/>)}
          </div>
        </div>
        <div style={{display:'grid',gap:10,marginBottom:28}}>
          {[{icon:"📧",label:"Send a Raven",value:"nidhiagarwal1427@gmail.com",href:"mailto:nidhiagarwal1427@gmail.com",color:"#E07B5A"},
            {icon:"💼",label:"Guild Registry",value:"LinkedIn Profile",href:"http://www.linkedin.com/in/nidhi-agarwal-01747720b",color:"#0077B5"},
            {icon:"📜",label:"Quest Archives",value:"GitHub Profile",href:"https://github.com/Nidhi006",color:"#333"},
            {icon:"📱",label:"Crystal Ball",value:"+91 9381001821",href:"tel:+919381001821",color:"#5BAE6E"}
          ].map((lk,i)=>(
            <a key={i} href={lk.href} target="_blank" rel="noopener noreferrer" style={{display:'flex',alignItems:'center',gap:14,background:'#fff',borderRadius:16,padding:'16px 20px',border:'1px solid rgba(0,0,0,0.04)',textDecoration:'none',color:'#3a3a5c',boxShadow:'0 2px 8px rgba(0,0,0,0.03)',animation:`fadeInQuick 0.3s ease ${i*0.08}s both`,transition:'all 0.25s ease'}} onMouseEnter={e=>{e.currentTarget.style.transform='translateX(6px)';e.currentTarget.style.boxShadow=`0 6px 20px ${lk.color}15`;e.currentTarget.style.borderColor=lk.color+'33';}} onMouseLeave={e=>{e.currentTarget.style.transform='translateX(0)';e.currentTarget.style.boxShadow='0 2px 8px rgba(0,0,0,0.03)';e.currentTarget.style.borderColor='rgba(0,0,0,0.04)';}}>
              <div style={{width:42,height:42,borderRadius:12,background:`${lk.color}10`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:22}}>{lk.icon}</div>
              <div><div style={{fontSize:10,color:'#999',fontWeight:600,textTransform:'uppercase',letterSpacing:0.5}}>{lk.label}</div><div style={{fontSize:14,fontWeight:700,color:lk.color}}>{lk.value}</div></div>
            </a>))}
        </div>
        <div style={{background:'linear-gradient(135deg,#FFFCF0,#FFF5E0)',borderRadius:20,padding:28,border:'2px solid rgba(212,168,83,0.15)',boxShadow:'0 4px 20px rgba(212,168,83,0.08)',position:'relative'}}>
          <div style={{position:'absolute',top:12,right:16,fontSize:10,opacity:0.3}}>📜</div>
          <div style={{fontFamily:"'Silkscreen',cursive",fontSize:13,color:'#8B6914',marginBottom:18,textAlign:'center'}}>✉️ Write a Message on the Parchment</div>
          <input value={formName} onChange={e=>setFormName(e.target.value)} placeholder="Your name, brave soul..." type="text" style={{width:'100%',padding:'12px 16px',borderRadius:12,border:'1px solid rgba(212,168,83,0.25)',background:'#fff',fontSize:13,marginBottom:10,outline:'none',fontFamily:"'Nunito',sans-serif",boxSizing:'border-box',transition:'border-color 0.3s'}} onFocus={e=>e.target.style.borderColor='#D4A853'} onBlur={e=>e.target.style.borderColor='rgba(212,168,83,0.25)'}/>
          <input value={formEmail} onChange={e=>setFormEmail(e.target.value)} placeholder="Your raven address (email)..." type="email" style={{width:'100%',padding:'12px 16px',borderRadius:12,border:'1px solid rgba(212,168,83,0.25)',background:'#fff',fontSize:13,marginBottom:10,outline:'none',fontFamily:"'Nunito',sans-serif",boxSizing:'border-box',transition:'border-color 0.3s'}} onFocus={e=>e.target.style.borderColor='#D4A853'} onBlur={e=>e.target.style.borderColor='rgba(212,168,83,0.25)'}/>
          <textarea value={formMsg} onChange={e=>setFormMsg(e.target.value)} placeholder="Your message..." rows={4} style={{width:'100%',padding:'12px 16px',borderRadius:12,border:'1px solid rgba(212,168,83,0.25)',background:'#fff',fontSize:13,marginBottom:14,outline:'none',resize:'vertical',fontFamily:"'Nunito',sans-serif",boxSizing:'border-box',transition:'border-color 0.3s'}} onFocus={e=>e.target.style.borderColor='#D4A853'} onBlur={e=>e.target.style.borderColor='rgba(212,168,83,0.25)'}/>
          <button onClick={()=>{
            if(!formName||!formEmail||!formMsg)return;
            const data=new URLSearchParams();
            data.append('entry.1455132117',formName);
            data.append('entry.2076645149',formEmail);
            data.append('entry.427192261',formMsg);
            fetch('https://docs.google.com/forms/u/0/d/e/1FAIpQLSd2MMs8S4Ng-ZfFYm9n3DjMk2tFlOUxFKbi9GCXDeQtsniG1A/formResponse',{method:'POST',body:data,mode:'no-cors'});
            setFormSent(true);setFormName('');setFormEmail('');setFormMsg('');
            if(onAchieve)onAchieve('social_butterfly');if(playSound)playSound('achieve');onXp(10);
          }} style={{width:'100%',padding:'14px',background:formSent?'linear-gradient(135deg,#5BAE6E,#7BC88A)':'linear-gradient(135deg,#E07B5A,#E8976F)',color:'#fff',border:'none',borderRadius:14,fontFamily:"'Silkscreen',cursive",fontSize:13,cursor:'pointer',transition:'all 0.3s',boxShadow:formSent?'0 4px 16px rgba(91,174,110,0.3)':'0 4px 16px rgba(224,123,90,0.3)',transform:formSent?'scale(1.02)':'scale(1)'}}>
            {formSent?'✓ Raven Sent Successfully!':'🕊️ Send a Raven'}
          </button>
        </div>
      </div></div>{back}</div>);
  }
  return null;
}