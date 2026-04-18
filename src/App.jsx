import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { ZONES, ACHIEVEMENTS, LEVELS, COLLISION_RECTS, EASTER_EGGS, MAP_NPCS } from "./data/gameData";
import { SKILLS_DATA, EXPERIENCE_DATA, PROJECTS_DATA, CERTS_DATA } from "./data/portfolioData";
import { useSound } from "./hooks/useSound";
import { CharacterSprite } from "./components/Character/index.jsx";
import { HUD, Minimap, MobileDPad, XPPopup, AchievementGallery } from "./components/HUD";
import { LoadingScreen, ZoneTransition } from "./components/Screens";
import { Particles, FootstepDust, ZoneBG, RadarChart, SkillTooltip, EasterEgg, ZoneMarker, MapNPC } from "./components/shared";
import { WorldMapBG } from "./components/WorldMap";
import { ZoneInterior } from "./components/Zones";

// ─── Main App ───
export default function App(){
  const[started,setStarted]=useState(false);const[currentZone,setCurrentZone]=useState(null);const[transitionZone,setTransitionZone]=useState(null);
  const[charPos,setCharPos]=useState({x:50,y:48});const[charDir,setCharDir]=useState('down');const[isMoving,setIsMoving]=useState(false);const[isSprinting,setIsSprinting]=useState(false);
  const[xp,setXp]=useState(0);const[visitedZones,setVisitedZones]=useState(new Set());const[achievements,setAchievements]=useState(new Set());const[showAchievement,setShowAchievement]=useState(null);
  const[foundEggs,setFoundEggs]=useState(new Set());const[soundOn,setSoundOn]=useState(false);const[isMobile,setIsMobile]=useState(false);
  const[footsteps,setFootsteps]=useState([]);const[stepsCount,setStepsCount]=useState(0);
  const[showGallery,setShowGallery]=useState(false);
  const[xpPopups,setXpPopups]=useState([]);
  const[levelUpData,setLevelUpData]=useState(null);
  const[prevLevel,setPrevLevel]=useState(0);
  const keysRef=useRef(new Set());const animRef=useRef(null);const stepIdRef=useRef(0);const stepAccRef=useRef(0);const sprintRef=useRef(false);
  const xpPopIdRef=useRef(0);

  const playSound = useSound(soundOn);

  useEffect(()=>{setIsMobile(window.innerWidth<768||'ontouchstart' in window);const h=()=>setIsMobile(window.innerWidth<768||'ontouchstart' in window);window.addEventListener('resize',h);return()=>window.removeEventListener('resize',h);},[]);

  // XP popup helper
  const showXpPopup = useCallback((amount) => {
    const id = xpPopIdRef.current++;
    setXpPopups(p => [...p, { id, amount }]);
    setTimeout(() => setXpPopups(p => p.filter(v => v.id !== id)), 1200);
  }, []);

  const addXp=useCallback(a=>{
    setXp(p=>{
      const newXp = p + a;
      // Check level up
      const oldLevel = LEVELS.reduce((acc, l, i) => p >= l.xp ? i : acc, 0);
      const newLevel = LEVELS.reduce((acc, l, i) => newXp >= l.xp ? i : acc, 0);
      
      return newXp;
    });
    showXpPopup(a);
    playSound('xp');
  },[showXpPopup, playSound]);

  const unlockAchievement=useCallback(id=>{if(achievements.has(id))return;const ach=ACHIEVEMENTS.find(a=>a.id===id);if(!ach)return;setAchievements(p=>new Set([...p,id]));setShowAchievement(ach);addXp(ach.xp);playSound('achieve');setTimeout(()=>setShowAchievement(null),3500);},[achievements,addXp,playSound]);

const enterZone=useCallback(zoneId=>{const zone=ZONES.find(z=>z.id===zoneId);setTransitionZone(zone);playSound('enter');setTimeout(()=>{setCurrentZone(zoneId);setTransitionZone(null);setVisitedZones(p=>{const isNew=!p.has(zoneId);const n=new Set([...p,zoneId]);if(n.size>=3&&!achievements.has('explorer'))setTimeout(()=>unlockAchievement('explorer'),800);if(n.size>=6&&!achievements.has('cartographer'))setTimeout(()=>unlockAchievement('cartographer'),800);if(isNew)addXp(50);return n;});},1200);},[achievements,unlockAchievement,addXp,playSound]);

  const findEgg=useCallback(egg=>{if(foundEggs.has(egg.id))return;const newFound=new Set([...foundEggs,egg.id]);setFoundEggs(newFound);addXp(75);if(!achievements.has('egg_hunter'))setTimeout(()=>unlockAchievement('egg_hunter'),500);if(newFound.size>=EASTER_EGGS.length&&!achievements.has('egg_master'))setTimeout(()=>unlockAchievement('egg_master'),1000);setShowAchievement({icon:egg.icon,name:'Easter Egg!',desc:egg.message,xp:75});playSound('achieve');setTimeout(()=>setShowAchievement(null),3500);},[foundEggs,achievements,unlockAchievement,addXp,playSound]);

  const checkCollision=useCallback((x,y)=>{for(const r of COLLISION_RECTS){if(x>=r.x1&&x<=r.x2&&y>=r.y1&&y<=r.y2)return true;}return false;},[]);

  useEffect(()=>{if(currentZone||transitionZone)return;const kd=e=>{if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','w','a','s','d','W','A','S','D','Enter','e','E','Shift'].includes(e.key)){e.preventDefault();if(e.key==='Enter'||e.key==='e'||e.key==='E'){let n=null,md=Infinity;ZONES.forEach(z=>{const d=Math.sqrt(Math.pow(charPos.x-z.x,2)+Math.pow(charPos.y-z.y,2));if(d<10&&d<md){n=z;md=d;}});if(n)enterZone(n.id);return;}if(e.key==='Shift'){sprintRef.current=true;setIsSprinting(true);if(!achievements.has('speedster'))unlockAchievement('speedster');return;}keysRef.current.add(e.key.toLowerCase());}};
    const ku=e=>{keysRef.current.delete(e.key.toLowerCase());if(e.key==='Shift'){sprintRef.current=false;setIsSprinting(false);}};window.addEventListener('keydown',kd);window.addEventListener('keyup',ku);return()=>{window.removeEventListener('keydown',kd);window.removeEventListener('keyup',ku);};},[currentZone,transitionZone,charPos,enterZone,achievements,unlockAchievement]);

  useEffect(()=>{if(currentZone||transitionZone)return;const tick=()=>{const keys=keysRef.current;const spd=sprintRef.current?0.54:0.3;let dx=0,dy=0;
    if(keys.has('w')||keys.has('arrowup')){dy-=spd;setCharDir('up');}if(keys.has('s')||keys.has('arrowdown')){dy+=spd;setCharDir('down');}if(keys.has('a')||keys.has('arrowleft')){dx-=spd;setCharDir('left');}if(keys.has('d')||keys.has('arrowright')){dx+=spd;setCharDir('right');}
    const mv=dx!==0||dy!==0;setIsMoving(mv);if(mv){setCharPos(prev=>{let nx=Math.max(3,Math.min(97,prev.x+dx));let ny=Math.max(5,Math.min(97,prev.y+dy));if(checkCollision(nx,ny)){if(!checkCollision(nx,prev.y))ny=prev.y;else if(!checkCollision(prev.x,ny))nx=prev.x;else{nx=prev.x;ny=prev.y;}}return{x:nx,y:ny};});
      stepAccRef.current+=1;if(stepAccRef.current%8===0){setStepsCount(p=>p+1);const id=stepIdRef.current++;setCharPos(prev=>{setFootsteps(fs=>[...fs.slice(-12),{id,x:prev.x,y:prev.y+1.5}]);return prev;});setTimeout(()=>setFootsteps(fs=>fs.filter(f=>f.id!==id)),800);}}
    animRef.current=requestAnimationFrame(tick);};animRef.current=requestAnimationFrame(tick);return()=>cancelAnimationFrame(animRef.current);},[currentZone,transitionZone,checkCollision]);

  useEffect(()=>{if(stepsCount>=60&&!achievements.has('wanderer'))unlockAchievement('wanderer');},[stepsCount,achievements,unlockAchievement]);
  useEffect(()=>{if(xp>=750&&!achievements.has('true_ally'))unlockAchievement('true_ally');},[xp,achievements,unlockAchievement]);

  const handleDirStart=useCallback(dir=>{if(dir==='sprint'){sprintRef.current=true;setIsSprinting(true);if(!achievements.has('speedster'))unlockAchievement('speedster');return;}keysRef.current.add({up:'w',down:'s',left:'a',right:'d'}[dir]);setCharDir(dir);},[achievements,unlockAchievement]);
  const handleDirEnd=useCallback(dir=>{if(dir==='sprint'){sprintRef.current=false;setIsSprinting(false);return;}keysRef.current.delete({up:'w',down:'s',left:'a',right:'d'}[dir]);},[]);
  const handleMobileAction=useCallback(()=>{let n=null,md=Infinity;ZONES.forEach(z=>{const d=Math.sqrt(Math.pow(charPos.x-z.x,2)+Math.pow(charPos.y-z.y,2));if(d<10&&d<md){n=z;md=d;}});if(n)enterZone(n.id);},[charPos,enterZone]);

  if(!started)return <><LoadingScreen onDone={()=>{setStarted(true);unlockAchievement('first_step');}}/></>;
  if(currentZone)return <>
    <HUD xp={xp} visitedCount={visitedZones.size} showAchievement={showAchievement} onToggleSound={()=>setSoundOn(!soundOn)} soundOn={soundOn} isSprinting={false} stepsCount={stepsCount} achievements={achievements} onShowGallery={()=>setShowGallery(true)} xpPopups={xpPopups}/>
    <ZoneInterior zoneId={currentZone} onBack={()=>setCurrentZone(null)} onXp={addXp} onAchieve={unlockAchievement} playSound={playSound}/>
    {showGallery&&<AchievementGallery achievements={ACHIEVEMENTS} unlocked={achievements} xp={xp} onClose={()=>setShowGallery(false)}/>}
    {levelUpData&&<LevelUpCelebration level={levelUpData} onDone={()=>setLevelUpData(null)}/>}
  </>;

  return <>
    <HUD xp={xp} visitedCount={visitedZones.size} showAchievement={showAchievement} onToggleSound={()=>setSoundOn(!soundOn)} soundOn={soundOn} isSprinting={isSprinting} stepsCount={stepsCount} achievements={achievements} onShowGallery={()=>setShowGallery(true)} xpPopups={xpPopups}/>
    {transitionZone&&<ZoneTransition zone={transitionZone} onComplete={()=>{}}/>}
    <div style={{position:'fixed',inset:0,overflow:'hidden',background:'#B0D8F0'}}>
      <div style={{position:'absolute',inset:0}}>
        <WorldMapBG/><Particles/><FootstepDust steps={footsteps}/>
        {ZONES.map(z=><ZoneMarker key={z.id} zone={z} isVisited={visitedZones.has(z.id)} onEnter={enterZone} charPos={charPos}/>)}
        {MAP_NPCS.map((n,i)=><MapNPC key={i} npc={n} charPos={charPos}/>)}
        {EASTER_EGGS.map(e=><EasterEgg key={e.id} egg={e} found={foundEggs.has(e.id)} onFind={findEgg}/>)}
        <CharacterSprite pos={charPos} direction={charDir} isMoving={isMoving} isSprinting={isSprinting}/>
        <div style={{position:'absolute',top:44,left:'50%',transform:'translateX(-50%)',zIndex:5,textAlign:'center',pointerEvents:'none'}}>
          <div style={{fontFamily:"'Silkscreen',cursive",fontSize:20,color:'#3a3a5c',textShadow:'0 2px 10px rgba(255,255,255,0.9)',letterSpacing:1.5}}>🗺️ World of Nidhi</div></div>
      </div>
      <Minimap charPos={charPos} zones={ZONES} visitedZones={visitedZones} isMobile={isMobile}/>
      {isMobile&&<MobileDPad onDirStart={handleDirStart} onDirEnd={handleDirEnd} onAction={handleMobileAction}/>}
      {!isMobile&&<div style={{position:'fixed',bottom:16,left:'50%',transform:'translateX(-50%)',zIndex:50,display:'flex',gap:8,alignItems:'center',background:'rgba(255,255,255,0.88)',borderRadius:12,padding:'6px 16px',fontSize:10,fontFamily:"'Nunito',sans-serif",color:'#888',backdropFilter:'blur(8px)',border:'1px solid rgba(108,99,255,0.08)'}}>
        <span style={{fontFamily:"'Silkscreen',cursive",color:'#6C63FF'}}>WASD</span> move<span style={{color:'#ddd'}}>·</span><span style={{fontFamily:"'Silkscreen',cursive",color:'#6C63FF'}}>Shift</span> sprint<span style={{color:'#ddd'}}>·</span><span style={{fontFamily:"'Silkscreen',cursive",color:'#6C63FF'}}>E</span> enter<span style={{color:'#ddd'}}>·</span>Click markers</div>}
    </div>
    {showGallery&&<AchievementGallery achievements={ACHIEVEMENTS} unlocked={achievements} xp={xp} onClose={()=>setShowGallery(false)}/>}
    {levelUpData&&<LevelUpCelebration level={levelUpData} onDone={()=>setLevelUpData(null)}/>}
  </>;
}

