import * as assert from 'assert';
import { count, count_fam,  recursiveCount, recursiveFam } from './guest_count';
import { Guest } from './guest';

describe('guest_count', function() {
    const empty=new Array<Guest>;
    const mgB0:Guest={name:'bill',guestOf:{from:'Molly'},family:true,dietary:"none",addGuest:'',gGdiet:"",bringingSomeone:'0'};
    const mgB1:Guest={name:'hein',guestOf:{from:'Molly'},family:true,dietary:"none",addGuest:'',gGdiet:"",bringingSomeone:'1'};
    const mgBU:Guest={name:'zero',guestOf:{from:'Molly'},family:false,dietary:"none",addGuest:'',gGdiet:"",bringingSomeone:'unknown'};
    const jgB0:Guest={name:'dill',guestOf:{from:'James'},family:true,dietary:"none",addGuest:'',gGdiet:"",bringingSomeone:'0'};
    const jgB1:Guest={name:'sara',guestOf:{from:'James'},family:true,dietary:"none",addGuest:'',gGdiet:"",bringingSomeone:'1'};
    const jgBU:Guest={name:'me',guestOf:{from:'James'},family:false,dietary:"none",addGuest:'',gGdiet:"",bringingSomeone:'unknown'};
    const breaker:Guest={name:'me',guestOf:{from:undefined},family:true,dietary:"none",addGuest:'',gGdiet:"",bringingSomeone:'unknown'};
    const oneguestM=new Array<Guest>;
    const oneguestJ=new Array<Guest>;
    
    it('count', function() {
//first branch min===max
assert.deepStrictEqual(count(oneguestJ,"James"),"0");

        //bigger test to hit most cases
    oneguestJ.push(mgB0);
    oneguestJ.push(jgB1);
    //should be 2-2, min=max second case
    assert.deepStrictEqual(count(oneguestJ,"James"),"2");
    oneguestJ.push(jgBU);
    //second branch when it diverges
    assert.deepStrictEqual(count(oneguestJ,"James"),"3-4");
    //should be 3-4
    oneguestJ.push(jgBU);
    assert.deepStrictEqual(count(oneguestJ,"James"),"4-6");
    //should be 4-6
    oneguestJ.push(jgB0);
    //should be 5-7
    assert.deepStrictEqual(count(oneguestJ,"James"),"5-7");
    oneguestJ.pop();
    oneguestJ.pop();
    oneguestJ.pop();
    oneguestJ.pop();
    oneguestJ.pop();

    });
    it('count_fam', function() {
        //0 edge case
        assert.deepStrictEqual(count_fam(empty,"James"),"0");
        assert.deepStrictEqual(count_fam(empty,"Molly"),"0");
        
//case where there are family members on other side in the guest list (dont want mix up)
            oneguestJ.push(mgB0);
            oneguestJ.push(jgB1);
            //should be only 1 cause only checking James
            assert.deepStrictEqual(count_fam(oneguestJ,"James"),"1");
            oneguestJ.push(mgB1);
            //should be only 2 cause only checking Molly
            assert.deepStrictEqual(count_fam(oneguestJ,"Molly"),"2");
            //case where guest from same side but arent fam
            oneguestJ.push(jgBU);
            assert.deepStrictEqual(count_fam(oneguestJ,"James"),"1");
            oneguestJ.push(mgBU);
            assert.deepStrictEqual(count_fam(oneguestJ,"James"),"1");
            
            oneguestJ.pop();
            oneguestJ.pop();
            oneguestJ.pop();
            oneguestJ.pop();
            oneguestJ.pop();
        
            });
            it('recursiveFam', function() {
                //base case with empty array
                assert.deepStrictEqual(recursiveFam(0,empty,"Molly"),0);
                assert.deepStrictEqual(recursiveFam(0,empty,"James"),0);
                //single recursion:
                //branch 1: right person 1 guest and fam
            oneguestJ.push(jgB1);
            assert.deepStrictEqual(recursiveFam(0,oneguestJ,"James"),1);
            oneguestJ.pop();
            //second case for molly
            oneguestM.push(mgB1);
            assert.deepStrictEqual(recursiveFam(0,oneguestM,"Molly"),1);
            oneguestM.pop();
                //branch 2:not fam 
            //U means not fam
            oneguestJ.push(jgBU);
            assert.deepStrictEqual(recursiveFam(0,oneguestJ,"James"),0);
            oneguestJ.pop();
            //second case but with molly
            oneguestM.push(mgBU);
            assert.deepStrictEqual(recursiveFam(0,oneguestM,"Molly"),0);
            oneguestM.pop();
            //branch 3: not right person but fam
            //has fam but not james
            oneguestJ.push(mgB1);
            assert.deepStrictEqual(recursiveFam(0,oneguestJ,"James"),0);
            oneguestJ.pop();
            //second case, has fam but not molly
            oneguestM.push(jgB1);
            assert.deepStrictEqual(recursiveFam(0,oneguestM,"Molly"),0);
            oneguestM.pop();
            //branch 4: not right person and not fam
            //has fam but not james
            oneguestJ.push(mgBU);
            assert.deepStrictEqual(recursiveFam(0,oneguestJ,"James"),0);
            oneguestJ.pop();
            //second case, not fam and not molly
            oneguestM.push(jgBU);
            assert.deepStrictEqual(recursiveFam(0,oneguestM,"Molly"),0);
            oneguestM.pop();
            //multiple recursion, can split it up to two branches cause already tested to ensure they landed in the right branch
            //2->2
                oneguestJ.push(jgBU);
                oneguestJ.push(jgBU);
                assert.deepStrictEqual(recursiveFam(0,oneguestJ,"James"),0);
                oneguestJ.pop();
                oneguestJ.pop();

                oneguestM.push(mgBU);
                oneguestM.push(mgBU);
                assert.deepStrictEqual(recursiveFam(0,oneguestJ,"Molly"),0);

                oneguestM.pop();
                oneguestM.pop();
            //1->2
            oneguestJ.push(jgB1);
            oneguestJ.push(jgBU);
            assert.deepStrictEqual(recursiveFam(0,oneguestJ,"James"),1);
            oneguestJ.pop();
            oneguestJ.pop();

            oneguestM.push(mgB0);
            oneguestM.push(mgBU);
            assert.deepStrictEqual(recursiveFam(0,oneguestM,"Molly"),1);

            oneguestM.pop();
            oneguestM.pop();

            //2->1
            oneguestJ.push(jgBU);
            oneguestJ.push(jgB0);
            assert.deepStrictEqual(recursiveFam(0,oneguestJ,"James"),1);
            oneguestJ.pop();
            oneguestJ.pop();

            oneguestM.push(mgBU);
            oneguestM.push(mgB1);
            assert.deepStrictEqual(recursiveFam(0,oneguestM,"Molly"),1);
            oneguestM.pop();
            oneguestM.pop();
//1->1
oneguestJ.push(jgB1);
            oneguestJ.push(jgB0);
            assert.deepStrictEqual(recursiveFam(0,oneguestJ,"James"),2);
            oneguestJ.pop();
            oneguestJ.pop();

            oneguestM.push(mgB0);
            oneguestM.push(mgB1);
            assert.deepStrictEqual(recursiveFam(0,oneguestM,"Molly"),2);

            oneguestM.pop();
            oneguestM.pop();
            
                //bigger test to hit most cases
                oneguestJ.push(mgB0);
                oneguestJ.push(jgB1);
                //should be m:1 j:1
                oneguestJ.push(jgBU);
                //should be m:1 j:1
                oneguestJ.push(jgB0);
                //should be m:1 j:2
                oneguestJ.push(mgB0);
                oneguestJ.push(jgB0);
                //should be m:2 j:3
                assert.deepStrictEqual(recursiveFam(0,oneguestJ,"James"),3);
                assert.deepStrictEqual(recursiveFam(0,oneguestJ,"Molly"),2);
                oneguestJ.pop();
                oneguestJ.pop();
                oneguestJ.pop();
                oneguestJ.pop();
                oneguestJ.pop();
                oneguestJ.pop();
                
            });
it('recursiveCount', function() {
    //base case with empty array
    assert.deepStrictEqual(recursiveCount(0,empty,"Molly",true),0);
    assert.deepStrictEqual(recursiveCount(0,empty,"James",false),0);
    //single recursion:
    //branch 1: right person 1 guest and min:
oneguestJ.push(jgB1);
assert.deepStrictEqual(recursiveCount(0,oneguestJ,"James",true),2);
oneguestJ.pop();
//making sure min boolean doesnt matter in this case
oneguestM.push(mgB1);
assert.deepStrictEqual(recursiveCount(0,oneguestM,"Molly",false),2);
oneguestM.pop();
//unknown but !min so still in this branch
oneguestJ.push(jgBU);
assert.deepStrictEqual(recursiveCount(0,oneguestJ,"James",false),2);
oneguestJ.pop();
//unknown but !min so still in this branch
oneguestM.push(mgBU);
assert.deepStrictEqual(recursiveCount(0,oneguestM,"Molly",false),2);
oneguestM.pop();

//branch 2: right person no guests:
oneguestJ.push(jgB0);
assert.deepStrictEqual(recursiveCount(0,oneguestJ,"James",true),1);
oneguestJ.pop();
//unknown but min so still in this branch
oneguestJ.push(jgBU);
assert.deepStrictEqual(recursiveCount(0,oneguestJ,"James",true),1);
oneguestJ.pop();
//unknown but min so still in this branch
oneguestM.push(mgBU);
assert.deepStrictEqual(recursiveCount(0,oneguestM,"Molly",true),1);
oneguestM.pop();

    //Branch 3 undefined, using escape hatch
    oneguestM.push(breaker);
    assert.throws(()=>recursiveCount(0,oneguestM,"James",true),Error);
    oneguestM.pop();

    //Branch 4: looking for wrong person
    oneguestM.push(mgB0);
    assert.deepStrictEqual(recursiveCount(0,oneguestM,"James",true),0);
    oneguestM.pop();
    oneguestM.push(mgB1);
    assert.deepStrictEqual(recursiveCount(0,oneguestM,"James",true),0);
    oneguestM.pop();
    oneguestJ.push(jgB1);
    assert.deepStrictEqual(recursiveCount(0,oneguestJ,"Molly",true),0);
    oneguestJ.pop();
    oneguestJ.push(jgBU);
    assert.deepStrictEqual(recursiveCount(0,oneguestJ,"Molly",true),0);
    oneguestJ.pop();
    
    //multiple recursion
//only 3 branches here because min is contant
    //1->1
    oneguestJ.push(jgB1);
    oneguestJ.push(jgBU);
    assert.deepStrictEqual(recursiveCount(0,oneguestJ,"James",false),4);
    assert.deepStrictEqual(recursiveCount(0,oneguestJ,"James",true),3);
    oneguestJ.pop();
    oneguestJ.pop();

    //1->2 Error
    oneguestJ.push(jgB1);
    oneguestJ.push(breaker);
    assert.throws(()=>recursiveCount(0,oneguestJ,"James",true),Error);
    oneguestJ.pop();
    oneguestJ.pop();

    //1->3
    oneguestJ.push(jgB1);
    oneguestJ.push(mgB0);
    assert.deepStrictEqual(recursiveCount(0,oneguestJ,"James",true),2);
    assert.deepStrictEqual(recursiveCount(0,oneguestJ,"James",false),2);
    oneguestJ.pop();
    oneguestJ.pop();
//no longer need to test Error branch due to escape hatch
    //3->1
    oneguestJ.push(mgB0);
    oneguestJ.push(jgB1);
    assert.deepStrictEqual(recursiveCount(0,oneguestJ,"James",true),2);
    assert.deepStrictEqual(recursiveCount(0,oneguestJ,"James",false),2);
    oneguestJ.pop();
    oneguestJ.pop();

    //bigger test to hit most cases
    oneguestJ.push(mgB0);
    oneguestJ.push(jgB1);
    //should be 2-2
    oneguestJ.push(jgBU);
    //should be 3-4
    oneguestJ.push(jgBU);
    //should be 4-6
    oneguestJ.push(mgB0);
    oneguestJ.push(jgB0);
    //should be 5-7
    assert.deepStrictEqual(recursiveCount(0,oneguestJ,"James",true),5);
    assert.deepStrictEqual(recursiveCount(0,oneguestJ,"James",false),7);
    oneguestJ.pop();
    oneguestJ.pop();
    oneguestJ.pop();
    oneguestJ.pop();
    oneguestJ.pop();
    //semi error testing:
    assert.deepStrictEqual(recursiveCount(1,empty,"Molly",true),0);
    
  });
});