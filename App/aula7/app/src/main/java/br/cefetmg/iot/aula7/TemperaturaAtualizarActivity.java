package br.cefetmg.iot.aula7;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.Editable;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

public class TemperaturaAtualizarActivity extends AppCompatActivity {

    EditText editText_valor_temp;
    Button button_enviar_temp;
    TextView textView_response_temp;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_temperatura_atualizar);

        editText_valor_temp = (EditText) findViewById(R.id.editText_valor_temp);

        button_enviar_temp = (Button) findViewById(R.id.button_enviar_temp);

        textView_response_temp = (TextView)findViewById(R.id.textView_response_temp);
        button_enviar_temp.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String valor = String.valueOf(editText_valor_temp.getText());

                Map<String, String> postData = new HashMap<>();
                postData.put("valor", valor);

                Calendar c = Calendar.getInstance();
                SimpleDateFormat dateformat = new SimpleDateFormat("dd-MMM-yyyy hh:mm:ss");
                String datetime = dateformat.format(c.getTime());
                postData.put("time", datetime);

                PostTemperatura post = new PostTemperatura(postData, textView_response_temp);
                post.execute();

            }
        });




    }
}
