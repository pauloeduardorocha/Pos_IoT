package br.cefetmg.iot.aula7;

import android.os.AsyncTask;
import android.util.Log;
import android.widget.TextView;

import org.json.JSONObject;

import java.io.IOException;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Map;


/**
 * Created by Pós Iot Sistemas de Computação.
 */


public class PostAtuador extends AsyncTask<Integer,String,String> {
    URL url;
    JSONObject postData;
    String retorno;
    TextView textView_response;

    public PostAtuador(Map<String, String> postData, TextView textView_response) {
        if (postData != null) {
            this.postData = new JSONObject(postData);
            this.textView_response = textView_response;
        }
        try {
            this.url = new URL("http://35.199.85.54:3000/atuador");
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void onPreExecute(){
        Log.i("Tarefa 1 - status", "PreExecute");

        textView_response.setText("Conectando...");

    }
    @Override
    protected String doInBackground(Integer... params) {
        Log.i("Tarefa 1 - status", "InBackground");

            try {
                HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();

                urlConnection.setDoOutput(true);
                urlConnection.setRequestProperty("Content-Type", "application/json");
                urlConnection.setRequestMethod("POST");

                if (this.postData != null) {
                    OutputStreamWriter writer = new OutputStreamWriter(urlConnection.getOutputStream());
                    writer.write(postData.toString());
                    writer.flush();
                }

                int statusCode = urlConnection.getResponseCode();
                if (statusCode ==  200) {
                    retorno = "Enviado!";
                } else {
                    retorno = "Erro ao Enviar!";
                }
                } catch (IOException e) {
                    e.printStackTrace();
                }

           return retorno;
    }

    @Override
    protected void onPostExecute(String s) {
        super.onPostExecute(s);
        textView_response.setText(s);

    }
}