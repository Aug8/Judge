import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/blackboard.css";
import "codemirror/mode/python/python";
import "../styles/QuestionStyle.css";
import axios from "axios";

function Question() {
  const { qID } = useParams();
  const [data, setData] = useState({ title: "title", detail: "detail" });
  const [code, setCode] = useState("");

  useEffect(() => {
    const getQuestion = async () => {
      await axios
        .get(`http://localhost:4000/questionAPI/${qID}`)
        .then((res) => {
          console.log(res.data);
          setData(res.data);
        });
    };
    getQuestion();
  }, []);

  const handleCodeChange = (editor, data, newCode) => {
    setCode(newCode);
  };

  const onSubmitCode = async (e) => {
    await axios
      .post(
        `http://localhost:4000/codeAPI/submit`,
        { qId: qID, code: code },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.status);
      });
  };

  return (
    <div className="Question">
      <div className="problem">
        <h2 className="title">{data.title}</h2>
        <div className="desc">
          {data.detail}
          <br></br>
          Jelly sweet roll jelly beans biscuit pie macaroon chocolate donut.
          Carrot cake caramels pie sweet apple pie tiramisu carrot cake.
          Marzipan marshmallow croissant tootsie roll lollipop. Cupcake lemon
          drops bear claw gummies. Jelly bear claw gummi bears lollipop cotton
          candy gummi bears chocolate bar cake cookie. Cupcake muffin danish
          muffin cookie gummies. Jelly beans tiramisu pudding. Toffee soufflé
          chocolate cake pastry brownie. Oat cake halvah sweet roll cotton candy
          croissant lollipop. Macaroon tiramisu chocolate bar candy candy carrot
          cake jelly sweet. Gummies croissant macaroon dessert. Chocolate cake
          dragée pie. Next level tbh everyday carry, blog copper mug forage
          kitsch roof party pickled hammock kale chips tofu. Etsy shoreditch
          8-bit microdosing, XOXO viral butcher banh mi humblebrag listicle woke
          bicycle rights brunch before they sold out ramps. Twee shabby chic
          taiyaki flannel, enamel pin venmo vape four loko. Hexagon kale chips
          typewriter kitsch 8-bit organic plaid small batch keffiyeh ethical
          banh mi narwhal echo park cronut. Zombie ipsum reversus ab viral
          inferno, nam rick grimes malum cerebro. De carne lumbering animata
          corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De
          apocalypsi gorger omero undead survivor dictum mauris. Hi mindless
          mortuis soulless creaturas, imo evil stalking monstra adventus resi
          dentevil vultus comedat cerebella viventium. Qui animated corpse,
          cricket bat max brucks terribilem incessu zomby. The voodoo sacerdos
          flesh eater, suscitat mortuos comedere carnem virus. Zonbi tattered
          for solum oculi eorum defunctis go lum cerebro. Nescio brains an
          Undead zombies. Sicut malus putrid voodoo horror. Nigh tofth eliv
          ingdead. Cat gets stuck in tree firefighters try to get cat down
          firefighters get stuck in tree cat eats firefighters' slippers kitty
          power ignore the squirrels, you'll never catch them anyway for what a
          cat-ass-trophy! or purr as loud as possible, be the most annoying cat
          that you can, and, knock everything off the table. Pretend you want to
          go out but then don't bite off human's toes, yet disappear for four
          days and return home with an expensive injury; bite the vet so catch
          eat throw up catch eat throw up bad birds.
        </div>
      </div>
      <div className="code">
        <button className="codebutton" onClick={onSubmitCode}>
          제출
        </button>
        <CodeMirror
          value={code}
          onBeforeChange={handleCodeChange}
          onChange={(editor, data, value) => {}}
          options={{
            mode: "python",
            theme: "blackboard",
            lineNumbers: true,
          }}
        />
      </div>
    </div>
  );
}

export default Question;
